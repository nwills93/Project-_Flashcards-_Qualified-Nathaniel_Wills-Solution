import React from "react"
import {Route, Switch, Link, useHistory} from "react-router-dom"

/*The path to this screen should include the deckId (i.e., /decks/:deckId/edit).

You must use the readDeck() function from src/utils/api/index.js to load the existing deck.

There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck being edited, and finally the text Edit Deck (e.g., Home/Rendering in React/Edit Deck).

It displays the same form as the Create Deck screen, except it is prefilled with information for the existing deck.

The user can edit and update the form.

If the user clicks Cancel, the user is taken to the Deck screen.*/

export default function EditDeck() {
    return <h1>Editing Deck</h1>
}