import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from "react-router-dom"
import NavBar from "./NavBar"
import CardFormPage from './CardFormPage'
import {updateCard, readDeck, readCard} from "../utils/api/index.js"

/*The path to this screen should include the deckId and the cardId (i.e., /decks/:deckId/cards/:cardId/edit).

You must use the readDeck() function from src/utils/api/index.js to load the deck that contains the card to be edited. Additionally, you must use the readCard() function from src/utils/api/index.js to load the card that you want to edit.

There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member, and finally the text Edit Card :cardId (e.g., Home/Deck React Router/Edit Card 4).

It displays the same form as the Add Card screen, except it is prefilled with information for the existing card. It can be edited and updated.

If the user clicks on either Save or Cancel, the user is taken to the Deck screen.*/

export default function EditCard() {
    
    const {deckId, cardId} = useParams()

    const history = useHistory()

    const [deck, setDeck] = useState({})

    const [card, setCard] = useState({})

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

    useEffect(() => {
        const abortController = new AbortController()
        readCard(cardId, abortController.signal).then(setCard).catch((error) => {
            if (error.name === "AbortError") {
                console.log("Aborted locating card")
            } else {
                throw error
            }
        })
        return () => abortController.abort
    }, [cardId])

    useEffect(() => {
        let data = {
          deckId: card.deckId,
          front: card.front,
          back: card.back,
          id: card.id
        }
        setFormData(data)
    }, [card])

    const [formData, setFormData] = useState({})

    const handleUpdateCardSubmission = (event) => {
        event.preventDefault()
        updateCard(formData)
        history.push(`/decks/${deckId}`)
    }
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
              submitLabel="Submit"/>
        </div>
    )
}