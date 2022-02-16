import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api/index.js";
import NavBar from "../Common/NavBar";

//displays the contents of a specific deck including its name, description, and each card description.

export default function Deck() {
  const { deckId } = useParams();

  const { url } = useRouteMatch();

  const [deck, setDeck] = useState({});

  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    function getDeck() {
      readDeck(deckId, abortController.signal)
        .then(setDeck)
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Aborted locating deck");
          } else {
            throw error;
          }
        });
    }
    getDeck();
    return () => abortController.abort;
  }, [deckId]);

  return (
    <div>
      <div className="mb-5">
        <NavBar name={deck.name} />
        <h4 className="mt-3">{deck.name}</h4>
        <p>{deck.description}</p>
        <Link to={`${url}/edit`}>
          <button type="button" className="btn btn-secondary">
            <span class="oi oi-pencil  mr-1"></span>Edit
          </button>
        </Link>
        <Link to={`${url}/study`}>
          <button type="button" className="btn btn-primary ml-2">
            <span class="oi oi-book  mr-1"></span>Study
          </button>
        </Link>
        <Link to={`${url}/cards/new`}>
          <button type="button" className="btn btn-primary ml-2">
            <span class="oi oi-plus mr-1"></span>Add Card
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-danger ml-2"
          onClick={() => {
            if (window.confirm("Delete this deck?")) deleteDeck(deckId);
            history.push("/");
          }}
        >
          <span class="oi oi-trash"></span>
        </button>
      </div>
      <h2>Cards</h2>
      {!deck.cards
        ? "Loading"
        : deck.cards.map((card, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span>{card.front}</span>
                  <span>{card.back}</span>
                </div>
                <div className="d-flex justify-content-end mt-2">
                  <Link to={`${url}/cards/${card.id}/edit`}>
                    <button type="button" className="btn btn-secondary mr-2">
                      <span class="oi oi-pencil  mr-1"></span>Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm("Delete this Card?"))
                        deleteCard(card.id);
                      history.go(0);
                    }}
                  >
                    <span class="oi oi-trash"></span>
                  </button>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
