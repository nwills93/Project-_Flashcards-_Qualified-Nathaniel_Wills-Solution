import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import NotEnoughCards from "./NotEnoughCards"
import { readDeck } from "../utils/api/index.js";

/*The path to this screen should include the deckId (i.e., /decks/:deckId/study).

You must use the readDeck() function from src/utils/api/index.js to load the deck that is being studied.

There is a breadcrumb navigation bar with links to home /, followed by the name of the deck being studied, and finally the text Study (e.g., Home/Rendering In React/Study).

The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.

Cards are shown one at a time, front-side first.

A button at the bottom of each card "flips" it to the other side.

After flipping the card, the screen shows a Next button (see the Next button section below) to continue to the next card.

After the final card in the deck has been shown, a message (see the Restart prompt section below) is shown offering the user the opportunity to restart the deck.

    --If the user does not restart the deck, they should return to the home screen.

Studying a deck with two or fewer cards should display a "Not enough cards" message (see the "Not enough cards" section below) and a button to add cards to the deck.*/

//Trying to figure out why the modal dialogue is prompted twice...

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
        setDisplay(deck.cards[index].front)
      } else {
          setDisplay("")
      }    
  }, [deck.cards, index])

  if(deck.cards && deck.cards.length <= 2) {
      return (
        <div>
            <NavBar name={deck.name} subname="Study" />
            <NotEnoughCards deck={deck} />
        </div>
      )
  }

  if (deck.cards && display === deck.cards[index].back && index === (deck.cards.length - 1)) {
      setTimeout(() => window.confirm("Restart Cards?") ? history.go(0) : history.push("/"), 500)
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
              {deck.cards && `Card ${index + 1} of ${
                    deck.cards.length
                  }`}
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
                setFlipStatus(false)
                setIndex(index + 1)
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
