import React from "react";
import { Link } from "react-router-dom";

//Warning that shows on screen in Study view when the deck that is trying to be studied has less than 3 cards in the deck.

//The user is propmted to Add cards to the deck unitl there are at least 3 cards in the deck.

export default function NotEnoughCards({ deck }) {
  return (
    <div>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {deck.cards.length} cards
        in this deck.
      </p>
      <Link to={`/decks/${deck.id}/cards/new`}>
        <button type="button" className="btn btn-primary">
          + Add Cards
        </button>
      </Link>
    </div>
  );
}
