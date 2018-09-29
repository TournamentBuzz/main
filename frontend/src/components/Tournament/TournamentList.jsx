import React from "react";
import TournamentCard from "components/Tournament/TournamentCard.jsx";
import TournamentAPI from "components/API/TournamentAPI.js";

class TournamentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentList: null
    };
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
      </div>
    );
  }
}

export default TournamentList;

/* <TournamentCard
          id="1"
          name="Tech Rec's Bowling Tournament"
          sponsor="Tech Rec"
          date="2/21/2019"
        />
        <TournamentCard
          id="2"
          name="Tech Rec's Billiards Tournament"
          sponsor="Tech Rec"
          date="3/14/2019"
        /> */
