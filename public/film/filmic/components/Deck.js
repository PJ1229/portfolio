import { createSlide } from "./Slide.js";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function slideFromHash(total) {
  const parsed = Number.parseInt(window.location.hash.slice(1), 10);
  return Number.isFinite(parsed) ? clamp(parsed - 1, 0, total - 1) : 0;
}

function isInteractiveTarget(target) {
  return target instanceof Element && Boolean(target.closest("a, button, input, select, textarea, video, [role='button'], [role='slider']"));
}

export class Deck {
  constructor(root, data) {
    this.root = root;
    this.data = data;
    this.mode = new URLSearchParams(window.location.search).get("view") === "present" ? "present" : "read";
    this.index = slideFromHash(data.slides.length);
    this.slides = [];
    this.ignoreHashChange = false;
    this.observer = null;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onHashChange = this.onHashChange.bind(this);
  }

  mount() {
    document.body.dataset.view = this.mode;

    const shell = document.createElement("div");
    shell.className = "filmic-shell";

    const stage = document.createElement("div");
    stage.className = "filmic-stage";
    stage.setAttribute("aria-label", `${this.data.meta.title} ${this.mode === "present" ? "presentation" : "treatment"}`);

    this.slides = this.data.slides.map((slide, index) => {
      const node = createSlide(slide, index, this.data.slides.length);
      stage.append(node);
      return node;
    });

    const viewNavigation = this.createViewNavigation();

    const controls = document.createElement("nav");
    controls.className = "filmic-controls";
    controls.setAttribute("aria-label", "Slide navigation");

    this.previousButton = document.createElement("button");
    this.previousButton.type = "button";
    this.previousButton.textContent = "←";
    this.previousButton.setAttribute("aria-label", "Previous slide");
    this.previousButton.addEventListener("click", () => this.goTo(this.index - 1));

    this.status = document.createElement("span");
    this.status.className = "filmic-controls__status";
    this.status.setAttribute("aria-live", "polite");

    this.nextButton = document.createElement("button");
    this.nextButton.type = "button";
    this.nextButton.textContent = "→";
    this.nextButton.setAttribute("aria-label", "Next slide");
    this.nextButton.addEventListener("click", () => this.goTo(this.index + 1));

    controls.append(this.previousButton, this.status, this.nextButton);
    if (this.mode === "present") {
      stage.addEventListener("click", (event) => {
        if (!isInteractiveTarget(event.target)) this.goTo(this.index + 1);
      });
      shell.append(stage, controls);
      document.addEventListener("keydown", this.onKeyDown);
      window.addEventListener("hashchange", this.onHashChange);
    } else {
      shell.append(stage);
      this.observeReadSections();
    }

    this.root.replaceChildren(shell);
    document.body.append(viewNavigation);

    this.render({ updateHash: false });

    if (this.mode === "read" && window.location.hash) {
      requestAnimationFrame(() => this.slides[this.index].scrollIntoView());
    }
  }

  createViewNavigation() {
    const navigation = document.createElement("nav");
    navigation.className = "filmic-view-nav";
    navigation.setAttribute("aria-label", "Page view");

    const home = document.createElement("a");
    home.href = "/";
    home.textContent = "pjk1m.com";

    this.viewLink = document.createElement("a");
    this.viewLink.className = "filmic-view-nav__mode";
    this.viewLink.textContent = this.mode === "present" ? "Read" : "Present";
    this.updateViewLink();

    navigation.append(home, this.viewLink);
    return navigation;
  }

  updateViewLink() {
    const hash = `#${this.index + 1}`;
    this.viewLink.href = this.mode === "present" ? `/filmic${hash}` : `/filmic?view=present${hash}`;
  }

  observeReadSections() {
    this.observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      this.index = Number(visible.target.dataset.slide) - 1;
      this.updateViewLink();
    }, { threshold: [0.35, 0.6] });

    this.slides.forEach((slide) => this.observer.observe(slide));
  }

  goTo(index) {
    const next = clamp(index, 0, this.data.slides.length - 1);
    if (next === this.index) return;
    this.index = next;
    this.render({ updateHash: true });
  }

  render({ updateHash }) {
    this.slides.forEach((slide, index) => {
      const active = this.mode === "read" || index === this.index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.toggleAttribute("inert", !active);
    });

    const current = this.data.slides[this.index];
    this.updateViewLink();

    if (this.mode === "present") {
      this.status.textContent = `${String(this.index + 1).padStart(2, "0")} / ${String(this.data.slides.length).padStart(2, "0")} · ${current.title}`;
      this.previousButton.disabled = this.index === 0;
      this.nextButton.disabled = this.index === this.data.slides.length - 1;
      document.title = `${current.title} — ${this.data.meta.title}`;
    } else {
      document.title = `${this.data.meta.title} — PJ Kim`;
    }

    if (updateHash) {
      const nextHash = `#${this.index + 1}`;
      if (window.location.hash !== nextHash) {
        this.ignoreHashChange = true;
        window.location.hash = nextHash;
      }
    }
  }

  onHashChange() {
    if (this.ignoreHashChange) {
      this.ignoreHashChange = false;
      return;
    }
    this.index = slideFromHash(this.data.slides.length);
    this.render({ updateHash: false });
  }

  onKeyDown(event) {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    if (isInteractiveTarget(event.target)) return;

    if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
      event.preventDefault();
      this.goTo(this.index + 1);
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      this.goTo(this.index - 1);
      return;
    }

    if (/^[1-9]$/.test(event.key)) {
      event.preventDefault();
      this.goTo(Number(event.key) - 1);
    }
  }
}
