import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index.js";
import DeckFormPage from "./DeckFormPage";
import NavBar from "../Common/NavBar";

//Create a deck. Submitting the data will save the user's changes to a new deck.

//The user will be redirected to the deck screen that contains the info of the deck that was just created.

//Cancelling redirects the user to the Home page.

export default function CreateDeck() {
  const initialFormState = {
    name: "",
    description: "",
  };

  const history = useHistory();

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleAddDeckSubmission = (event) => {
    event.preventDefault();
    createDeck(formData).then((deck) => history.push(`/decks/${deck.id}`));
  };

  return (
    <div>
      <NavBar name="Create Deck" />
      <h1>Create Deck</h1>
      <DeckFormPage
        onSubmit={handleAddDeckSubmission}
        onCancel={() => history.push("/")}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
