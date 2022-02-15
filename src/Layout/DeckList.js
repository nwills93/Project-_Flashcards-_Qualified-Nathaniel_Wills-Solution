import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index.js";

//Deleting the deck works, but the page must be refreshed in order to see the changes.

export default function DeckList() {
  const [decks, setDecks] = useState([]);

  const history = useHistory()

  useEffect(() => {
    const abortController = new AbortController();
    function getDecks() {
    listDecks(abortController.signal)
      .then(setDecks)
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Aborted loading decks");
        } else {
          throw error;
        }
      });
    }
    getDecks()
    return () => abortController.abort;
  }, []);

  return (
    <div>
      <Link to="/decks/new">
        <button type="button" className="btn btn-primary mb-3">
          + Create Deck
        </button>
      </Link>
      <div>
      {decks.map((deck, index) => (
        <div key={index} className="card">
            <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{`${deck.cards.length} cards`}</h6>
                <p className="card-text">
                {deck.description}
                </p>
                <Link to={`decks/${deck.id}`}><button type="button" className="btn btn-secondary">View</button></Link>
                <Link to={`/decks/${deck.id}/study`}>
                <button type="button" className="btn btn-primary">Study</button>
                </Link>
                <button type="button" className="btn btn-danger" onClick={() => {if(window.confirm("Delete this Deck?"))deleteDeck(deck.id); history.go(0)}}>Delete</button>
            </div>
        </div>
    ))}
    </div>
    </div>
  );
}
