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
            <Route path="/tournament/:id" component={TournamentDetails} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
