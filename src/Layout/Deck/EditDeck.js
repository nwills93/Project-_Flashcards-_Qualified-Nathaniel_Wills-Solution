import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index.js";
import DeckFormPage from "./DeckFormPage";
import NavBar from "../Common/NavBar";

//Edit a pre-existing deck. Input fields populate with pre-existing information from the deck.

//Saving updates the deck with new information and redirects the user back to the deck screen.

//Cancelling redirects the user back to the deck screen.

export default function EditDeck() {
  const { deckId } = useParams();

  const history = useHistory();

  const [deck, setDeck] = useState({});

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
    const initialFormState = {
      id: deck.id,
      name: deck.name,
      description: deck.description,
    };
    setFormData(initialFormState);
  }, [deck]);

  const [formData, setFormData] = useState({});

  const handleUpdateDeckSubmission = (event) => {
    event.preventDefault();
    updateDeck(formData).then((deck) => history.push(`/decks/${deckId}`));
  };

  return (
    <div>
      <div>
        <NavBar name={deck.name} subname="Edit Deck" />
      </div>
      <h1>Edit Deck</h1>
      <DeckFormPage
        onSubmit={handleUpdateDeckSubmission}
        onCancel={() => history.push(`/decks/${deckId}`)}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
