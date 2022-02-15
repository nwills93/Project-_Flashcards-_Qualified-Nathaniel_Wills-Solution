import React, {useState, useEffect} from "react"
import {Link, useRouteMatch, useParams, useHistory} from "react-router-dom"
import {readDeck, deleteDeck, deleteCard} from "../utils/api/index.js"
import NavBar from  "./NavBar"

/*The path to this screen should include the deckId (i.e., /decks/:deckId).

You must use the readDeck() function from src/utils/api/index.js to load the existing deck.

There is a breadcrumb navigation bar with a link to home / followed by the name of the deck (e.g., Home/React Router).

The screen includes the deck name (e.g., "React Router") and deck description (e.g., "React Router is a collection of navigational components that compose declaratively in your application").

The screen includes Edit, Study, Add Cards, and Delete buttons. Each button takes the user to a different destination, as follows:

    | Button Clicked | Destination |
    | -------------- | ---------------------------------------------------------------------------------------------- |
    | Edit | Edit Deck Screen |
    | Study | Study screen |
    | Add Cards | Add Card screen |
    | Delete | Shows a warning message before deleting the deck]( See the "Delete Card Prompt" section) |

Each card in the deck:

    Is listed on the page under the "Cards" heading.
    Shows a question and the answer to the question.
    Has an Edit button that takes the user to the Edit Card screen when clicked.
    Has a Delete button that allows that card to be deleted. */

export default function Deck() {
    const {deckId} = useParams()

    const {url} = useRouteMatch()

    const [deck, setDeck] = useState({})

    const history = useHistory()

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

    return (
        <div>
          <div className="mb-5">
            <NavBar name={deck.name} />
            <h4>{deck.name}</h4>
            <p>{deck.description}</p>
            <Link to={`${url}/edit`}><button type="button" className="btn btn-secondary">Edit</button></Link>
            <Link to={`${url}/study`}><button type="button" className="btn btn-primary">Study</button></Link>
            <Link to={`${url}/cards/new`}><button type="button" className="btn btn-primary">+ Add Card</button></Link>
            <button type="button" className="btn btn-danger" onClick={() => {if(window.confirm("Delete this deck?"))deleteDeck(deckId); history.push("/")}}>Delete</button>
          </div>
          <h2>Cards</h2>
          {!deck.cards ? "Loading" :
           deck.cards.map((card, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span>{card.front}</span>
                  <span>{card.back}</span>
                </div>
                <div className="d-flex justify-content-end">
                  <Link to={`${url}/cards/${card.id}/edit`}><button type="button" className="btn btn-secondary">Edit</button></Link>
                  <button type="button" className="btn btn-danger" onClick={() => {if(window.confirm("Delete this Card?"))deleteCard(card.id); history.go(0)}}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
    )
}

/* TODO: add delete functionality to both delete deck and delete card. use window.confirm() to create warning prompt */