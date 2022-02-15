import React, {useState, useEffect} from "react"
import {useHistory, useParams} from "react-router-dom"
import {readDeck, updateDeck} from "../utils/api/index.js"
import DeckFormPage from "./DeckFormPage"
import NavBar from "./NavBar"

/*The path to this screen should include the deckId (i.e., /decks/:deckId/edit).

You must use the readDeck() function from src/utils/api/index.js to load the existing deck.

There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck being edited, and finally the text Edit Deck (e.g., Home/Rendering in React/Edit Deck).

It displays the same form as the Create Deck screen, except it is prefilled with information for the existing deck.

The user can edit and update the form.

If the user clicks Cancel, the user is taken to the Deck screen.*/

export default function EditDeck() {
    const {deckId} = useParams()

    const history = useHistory()

    const [deck, setDeck] = useState({})

    useEffect(() => {
        const abortController = new AbortController()
        function getDeck() {
        readDeck(deckId, abortController.signal).then(setDeck).catch((error) => {
            if (error.name === "AbortError") {
                console.log("Aborted locating deck")
            } else {
                throw error
            }
        })  
      }
      getDeck()
      return () => abortController.abort
    }, [deckId])

    useEffect(() => {
        const initialFormState = {
            id: deck.id,
            name: deck.name,
            description: deck.description
        }
        setFormData(initialFormState)
    }, [deck])
   

    const [formData, setFormData] = useState({})

    const handleUpdateDeckSubmission = (event) => {
        event.preventDefault()
        updateDeck(formData).then((deck) => history.push(`/decks/${deckId}`))
    }

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
    )
}