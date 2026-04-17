// server.js
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
require("dotenv").config();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(
  helmet({
    // Allow inline scripts used across static pages
    contentSecurityPolicy: false,
  })
);
app.use(compression());
app.use(express.json({ limit: "64kb" })); // parse JSON body with size cap
// serve static files (but don't auto-serve public/index.html at "/")
app.use(express.static(path.join(__dirname, "public"), { index: false }));

const requiredEnv = ["EMAIL_USER", "EMAIL_PASS"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) {
  console.error(`Missing required env vars: ${missingEnv.join(", ")}`);
  process.exit(1);
}

// --- Lab as primary site (no redirects to avoid loops with external rules) ---
function sendLabIndex(res) {
  res.sendFile(path.join(__dirname, "public", "lab", "index.html"));
}

app.get("/", (req, res) => {
  sendLabIndex(res);
});

// Some pages use relative "index.html" back links.
// In production this can resolve to "/index.html" (e.g. from "/dsa.html"),
// so serve the lab index there too.
app.get("/index.html", (req, res) => {
  sendLabIndex(res);
});

app.get("/lab", (req, res) => {
  sendLabIndex(res);
});

app.get("/lab/", (req, res) => {
  sendLabIndex(res);
});

app.get("/lab/index.html", (req, res) => {
  sendLabIndex(res);
});

// Shortcuts: old lab-style URLs at root
app.get("/inspo.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "lab", "inspo.html"));
});

app.get("/blog.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "lab", "blog.html"));
});

app.get("/dsa.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "lab", "dsa.html"));
});

app.get("/guitar.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "lab", "guitar.html"));
});

// --- Legacy site (v1) ---
app.get("/legacy", (req, res) => {
  res.redirect("/legacy/");
});

app.get("/legacy/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "legacy", "index.html"));
});

// --- Contact API endpoint ---
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { subject, name, email, message } = req.body;

  if (!subject || !name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const trimmedSubject = String(subject).trim();
  const trimmedName = String(name).trim();
  const trimmedEmail = String(email).trim();
  const trimmedMessage = String(message).trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !trimmedSubject ||
    !trimmedName ||
    !trimmedEmail ||
    !trimmedMessage ||
    trimmedSubject.length > 120 ||
    trimmedName.length > 120 ||
    trimmedEmail.length > 254 ||
    trimmedMessage.length > 4000 ||
    !emailRegex.test(trimmedEmail)
  ) {
    return res.status(400).json({ error: "Invalid input." });
  }

  try {
    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: trimmedEmail,
      to: process.env.EMAIL_USER,
      subject: `[Portfolio Contact] ${trimmedSubject}`,
      text: `
        📬 New message from your portfolio site:

        Name: ${trimmedName}
        Email: ${trimmedEmail}
        Subject: ${trimmedSubject}

        Message:
        ${trimmedMessage}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent from ${email}`);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// --- Guitar playlist proxy (YouTube Data API) ---
app.get("/api/guitar-videos", async (req, res) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = "PLOOEcr8flEUQKD08-AmKlSv-eydxa3Ot6";

  if (!apiKey) {
    console.error("Missing YOUTUBE_API_KEY");
    return res.status(500).json({ error: "Server is not configured for guitar videos." });
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet,contentDetails");
  url.searchParams.set("maxResults", "50");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("YouTube API error", response.status, response.statusText);
      return res.status(502).json({ error: "Failed to load playlist." });
    }

    const data = await response.json();
    const items =
      Array.isArray(data.items) ?
      data.items
        .filter((item) => item.snippet && item.snippet.resourceId && item.snippet.resourceId.videoId)
        .map((item) => {
          const vId = item.snippet.resourceId.videoId;
          return {
            id: vId,
            title: item.snippet.title || "Untitled video",
            url: `https://www.youtube.com/watch?v=${vId}`,
            publishedAt: item.contentDetails && item.contentDetails.videoPublishedAt
              ? item.contentDetails.videoPublishedAt
              : null,
          };
        })
      : [];

    res.json({ items });
  } catch (err) {
    console.error("Error fetching YouTube playlist:", err);
    res.status(500).json({ error: "Failed to load playlist." });
  }
});

// --- Server startup ---
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
