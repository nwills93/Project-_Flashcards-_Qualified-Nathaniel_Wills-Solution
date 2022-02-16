import React from "react";
import {Switch, Route} from "react-router-dom"
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../Deck/DeckList"
import Deck from "../Deck/Deck"
import Study from "../Study/Study"
import AddCard from "../Card/AddCard"
import EditCard from "../Card/EditCard"
import CreateDeck from "../Deck/CreateDeck"
import EditDeck from "../Deck/EditDeck"

//Home page of the flash card app. Contains all routes to specific screens.


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          
          <Route exact path="/">
            <DeckList />
          </Route>

          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>

          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch> 
      </div>
    </>
  );
}

export default Layout;
