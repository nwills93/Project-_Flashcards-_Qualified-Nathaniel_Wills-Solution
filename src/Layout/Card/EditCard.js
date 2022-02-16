import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../Common/NavBar";
import CardFormPage from "./CardFormPage";
import { updateCard, readDeck, readCard } from "../../utils/api/index.js";

//Edit a pre-existing card. Form input fields populate with the existing info from a card.

//Submitting changes saves your changes and redirects the user back to the deck page that the card belongs to.

//Cancelling changes redirects the user back to the deck that the card belongs to.

export default function EditCard() {
  const { deckId, cardId } = useParams();

  const history = useHistory();

  const [deck, setDeck] = useState({});

  const [card, setCard] = useState({});

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

  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal)
      .then(setCard)
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Aborted locating card");
        } else {
          throw error;
        }
      });
    return () => abortController.abort;
  }, [cardId]);

  useEffect(() => {
    let data = {
      deckId: card.deckId,
      front: card.front,
      back: card.back,
      id: card.id,
    };
    setFormData(data);
  }, [card]);

  const [formData, setFormData] = useState({});

  const handleUpdateCardSubmission = (event) => {
    event.preventDefault();
    updateCard(formData);
    history.push(`/decks/${deckId}`);
  };
  return (
    <div>
      <NavBar name={deck.name} subname={`Edit Card: ${cardId}`} />
      <h1>Edit Card</h1>
      <CardFormPage
        onSubmit={handleUpdateCardSubmission}
        onCancel={() => history.push(`/decks/${deck.id}`)}
        formData={formData}
        setFormData={setFormData}
        cancelLabel="Cancel"
        submitLabel="Submit"
      />
    </div>
  );
}
