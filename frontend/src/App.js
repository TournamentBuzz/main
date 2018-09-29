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
import TournamentCreate from "views/TournamentCreate";
import NotFound from "views/NotFound";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route
              path="/tournament/create"
              exact
              component={TournamentCreate}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
