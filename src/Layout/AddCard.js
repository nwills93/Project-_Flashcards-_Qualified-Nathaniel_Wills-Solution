import React, {useState, useEffect} from "react"
import {useHistory, useParams} from "react-router-dom"
import NavBar from "./NavBar"
import CardFormPage from "./CardFormPage"
import {createCard, readDeck} from "../utils/api/index.js"
/*The path to this screen should include the deckId (i.e., /decks/:deckId/cards/new).

You must use the readDeck() function from src/utils/api/index.js to load the deck that you're adding the card to.

There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck to which the cards are being added, and finally the text Add Card (e.g., Home/React Router/Add Card).

The screen displays the React Router: Add Card deck title.

A form is shown with the "front" and "back" fields for a new card. Both fields use a <textarea> tag that can accommodate multiple lines of text.

If the user clicks Save, a new card is created and associated with the relevant deck. Then the form is cleared and the process for adding a card is restarted.

If the user clicks Done, the user is taken to the Deck screen.*/

export default function AddCard() {
    const initialFormState = {
        front:"",
        back:""
    }

    const [deck, setDeck] = useState({})
    const {deckId} = useParams()

    useEffect(() => {
        const abortController = new AbortController()
        readDeck(deckId, abortController.signal).then(setDeck).catch((error) => {
            if (error.name === "AbortError") {
                console.log("Aborted locating deck")
            } else {
                throw error
            }
        })
        return () => abortController.abort
    }, [deckId])

    const [formData, setFormData] = useState({...initialFormState})

    const history = useHistory()

    const handleAddCardSubmission = (event) => {
        event.preventDefault()
        createCard(deckId, formData)
        setFormData({...initialFormState})
    }


    return (
        <div>
           <div><NavBar name={deck.name} subname="Add Card"/></div>
           {Object.keys(deck).length === 0 ? <h1>Loading</h1> : <h1>{deck.name}: Add Card</h1>}
           <CardFormPage 
             onSubmit={handleAddCardSubmission}
             onCancel={() => history.push(`/decks/${deck.id}`)}
             formData={formData}
             setFormData={setFormData}
             cancelLabel="Done"
             submitLabel="Save"/>
        </div>
    )
}