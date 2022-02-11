import React from "react"
import {Route, Switch, Link} from "react-router-dom"

/*The path to this screen should be /decks/new.

There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck).

A form is shown with the appropriate fields for creating a new deck.

    --The name field is an <input> field of type text.
    
    --The description field is a <textarea> field that can be multiple lines of text.

If the user clicks Submit, the user is taken to the Deck screen.

If the user clicks Cancel, the user is taken to the Home screen.*/

export default function CreateDeck() {
    return <h1>Creating a deck yo</h1>
}