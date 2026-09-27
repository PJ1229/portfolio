import deckData from "./deck.js";
import { Deck } from "./components/Deck.js";

const root = document.querySelector("#filmic-app");

if (!root) {
  throw new Error("Missing #filmic-app root.");
}

const presentation = new Deck(root, deckData);
presentation.mount();
