import React from "react";
import TournamentCard from "components/Tournament/TournamentCard.jsx";

class TournamentList extends React.Component {
  render() {
    return (
      <div>
        <TournamentCard
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
        />
      </div>
    );
  }
}

export default TournamentList;
