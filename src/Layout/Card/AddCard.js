import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../Common/NavBar";
import CardFormPage from "./CardFormPage";
import { createCard, readDeck } from "../../utils/api/index.js";

//Screen for adding a card to a specific deck. Saving adds the card to the deck, clears the form, and allows you to add another card. 
//Clicking Done takes you to the specified deck's screen.

export default function AddCard() {
  const initialFormState = {
    front: "",
    back: "",
  };

  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Aborted locating deck");
        } else {
          throw error;
        }
      });
    return () => abortController.abort;
  }, [deckId]);

  const [formData, setFormData] = useState({ ...initialFormState });

  const history = useHistory();

  const handleAddCardSubmission = (event) => {
    event.preventDefault();
    createCard(deckId, formData);
    setFormData({ ...initialFormState });
  };

  return (
    <div>
      <div>
        <NavBar name={deck.name} subname="Add Card" />
      </div>
      {Object.keys(deck).length === 0 ? (
        <h1>Loading</h1>
      ) : (
        <h1>{deck.name}: Add Card</h1>
      )}
      <CardFormPage
        onSubmit={handleAddCardSubmission}
        onCancel={() => history.push(`/decks/${deck.id}`)}
        formData={formData}
        setFormData={setFormData}
        cancelLabel="Done"
        submitLabel="Save"
      />
    </div>
  );
}
