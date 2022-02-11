import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {listDecks} from "../utils/api/index.js"
import classNames from "../utils/class-names/index.js"

export default function DeckList() {
    const [decks, setDecks] = useState([])
    
    useEffect(() => {
        const abortController = new AbortController()
        listDecks(abortController.signal).then(setDecks).catch((error) => {
            if (error.name === "AbortError") {
                console.log("Aborted loading decks")
            }
            else {
                throw error
            }
        })
        return () => abortController.abort
    }, [])

    const deckList = decks.map((deck) => (
        <ul key={deck.id}>
           <li>
               {deck.name}
               {deck.description}
            </li> 
        </ul>
    ))

    return (
        <main>
            <Link to="/decks/new"><button type="button" className="btn btn-primary">+ Create Deck</button></Link>
            <div className={classNames({container: true})}>{deckList}</div>
        </main>
    )
}