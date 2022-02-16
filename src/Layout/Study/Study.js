import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "../Common/NavBar";
import NotEnoughCards from "./NotEnoughCards";
import { readDeck } from "../../utils/api/index.js";


//User can "study" each card in a deck. Each card shows the front of the card first and flips to the back of the card when the user hits 'Flip".

//When the backside of the final card in the deck appears, the user is prompted to either restart from the beginning or cancel, which redirects the user back to the home page.

export default function Study() {
  const [deck, setDeck] = useState({});

  const { deckId } = useParams();

  const history = useHistory();

  const [flipStatus, setFlipStatus] = useState(false);

  const [display, setDisplay] = useState("");

  const [index, setIndex] = useState(0);

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

  useEffect(() => {
    if (deck.cards && deck.cards.length >= 1) {
      setDisplay(deck.cards[index].front);
    } else {
      setDisplay("");
    }
  }, [deck.cards, index]);

  if (deck.cards && deck.cards.length <= 2) {
    return (
      <div>
        <NavBar name={deck.name} subname="Study" />
        <NotEnoughCards deck={deck} />
      </div>
    );
  }

  if (
    deck.cards &&
    display === deck.cards[index].back &&
    index === deck.cards.length - 1
  ) {
    setTimeout(
      () =>
        window.confirm("Restart Cards?") ? history.go(0) : history.push("/"),
      500
    );
  }

  if (!flipStatus)
    return (
      <div>
        <div>
          <NavBar name={deck.name} subname="Study" />
        </div>
        <h1>{`Study: ${deck.name}`}</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              {deck.cards && `Card ${index + 1} of ${deck.cards.length}`}
            </h5>
            <p className="card-text">{deck.cards && display}</p>
            <button
              type="button"
              onClick={() => {
                setFlipStatus(true);
                setDisplay(deck.cards[index].back);
              }}
              className="btn btn-secondary"
            >
              Flip
            </button>
          </div>
        </div>
      </div>
    );
  return (
    <div>
      <div>
        <NavBar name={deck.name} subname="Study" />
      </div>
      <h1>{`Study: ${deck.name}`}</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {deck.cards && `Card ${index + 1} of ${deck.cards.length}`}
          </h5>
          <p className="card-text">{deck.cards && display}</p>
          <button
            type="button"
            onClick={() => {
              setFlipStatus(false);
              setDisplay(deck.cards[index].front);
            }}
            className="btn btn-secondary"
          >
            Flip
          </button>
          <button
            type="button"
            onClick={() => {
              setFlipStatus(false);
              setIndex(index + 1);
            }}
            className="btn btn-primary ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
