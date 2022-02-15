import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import {createDeck} from "../utils/api/index.js"
import DeckFormPage from "./DeckFormPage"
import NavBar from "./NavBar"

/*The path to this screen should be /decks/new.

There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck).

A form is shown with the appropriate fields for creating a new deck.

    --The name field is an <input> field of type text.
    
    --The description field is a <textarea> field that can be multiple lines of text.

If the user clicks Submit, the user is taken to the Deck screen.

If the user clicks Cancel, the user is taken to the Home screen.*/

export default function CreateDeck() {
    const initialFormState = {
        name: "",
        description: ""
    }

    const history = useHistory()

    const [formData, setFormData] = useState({...initialFormState})

    const handleAddDeckSubmission = (event) => {
        event.preventDefault()
        createDeck(formData).then((deck) => history.push(`/decks/${deck.id}`))
    }

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
    )
}