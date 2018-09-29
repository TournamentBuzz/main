import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import "./App.css";

// Pages
import HomePage from "views/HomePage";
import TournamentDetails from "views/TournamentDetails";
import MatchDetails from "views/MatchDetails";
import TournamentCreate from "views/TournamentCreate";
import TournamentEdit from "views/TournamentEdit";
import NotFound from "views/NotFound";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route
              path="/login"
              render={props => <HomePage {...props} login={true} />}
            />
            <Route
              path="/register"
              render={props => <HomePage {...props} register={true} />}
            />
            <Route path="/tournament" exact component={HomePage} />
            <Route
              path="/tournament/create"
              exact
              component={TournamentCreate}
            />
            <Route
              path="/tournament/:tournamentID"
              exact
              component={TournamentDetails}
            />
            <Route
              path="/tournament/:tournamentID/edit"
              exact
              component={TournamentEdit}
            />
            <Route
              path="/tournament/:tournamentID/match/:matchID"
              component={MatchDetails}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
