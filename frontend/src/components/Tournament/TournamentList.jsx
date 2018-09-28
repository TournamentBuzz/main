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
      return;
    }
    if (tournaments === undefined) {
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
          <div>Loading Tournaments</div>
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
