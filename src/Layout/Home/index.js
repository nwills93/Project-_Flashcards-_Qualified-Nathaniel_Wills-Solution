import React from "react";
import {Switch, Route, Link} from "react-router-dom"
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../DeckList"
import Deck from "../Deck"
import Study from "../Study"
import AddCard from "../AddCard"
import EditCard from "../EditCard"
import CreateDeck from "../CreateDeck"
import EditDeck from "../EditDeck"


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
