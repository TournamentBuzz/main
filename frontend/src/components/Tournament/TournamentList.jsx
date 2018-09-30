import React from "react";
import { withRouter } from "react-router-dom";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

import TournamentCard from "components/Tournament/TournamentCard.jsx";
import TournamentAPI from "components/API/TournamentAPI.js";

class TournamentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentList: null
    };
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  handleAddClick() {
    this.props.history.push("/tournament/create");
  }

  async createTournamentList() {
    let tournaments = undefined;
    try {
      tournaments = await TournamentAPI.getTournaments();
    } catch (error) {
      let message = <h2>Error loading tournament</h2>;
      this.setState({ tournamentList: message });
      return;
    }
    if (tournaments === undefined) {
      let message = <h2>Please login to view tournaments</h2>;
      this.setState({ tournamentList: message });
      return;
    }
    if (tournaments.length < 1) {
      let message = <h2>No upcoming tournaments</h2>;
      this.setState({ tournamentList: message });
      return;
    }
    let list = [];
    for (let tournament of tournaments) {
      let card = (
        <TournamentCard
          key={tournament.id}
          id={tournament.id}
          name={tournament.tournamentName}
          sponsor={tournament.creator}
          date={new Date(Date.parse(tournament.startDate)).toDateString()}
        />
      );
      list.push(card);
    }
    this.setState({ tournamentList: list });
  }

  async componentDidMount() {
    await this.createTournamentList();
  }

  render() {
    return (
      <div>
        {this.state.tournamentList === null ? (
          <h2>Loading Tournaments</h2>
        ) : (
          <div>{this.state.tournamentList}</div>
        )}
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          onClick={this.handleAddClick}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default withRouter(TournamentList);
