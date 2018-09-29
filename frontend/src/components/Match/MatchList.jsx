import React from "react";
import Grid from "@material-ui/core/Grid";
import MatchCard from "components/Match/MatchCard.jsx";

class MatchList extends React.Component {
  render() {
    // use later for retrieving matches (rather than hard coding)
    const { tournamentID } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={4}>
            <MatchCard
              id="1"
              team1="Ballin Bowlers"
              team2="Nothing but Strikes"
              time="3/30/19 7:00pm"
            />
          </Grid>
          <Grid item xs={4}>
            <MatchCard
              id="2"
              team1="Ballin Bowlers"
              team2="Nothing but Strikes"
              time="3/30/19 7:00pm"
            />
          </Grid>
          <Grid item xs={4}>
            <MatchCard
              id="3"
              team1="Ballin Bowlers"
              team2="Nothing but Strikes"
              time="3/30/19 7:00pm"
            />
          </Grid>
          <Grid item xs={4}>
            <MatchCard
              id="4"
              team1="Ballin Bowlers"
              team2="Nothing but Strikes"
              time="3/30/19 7:00pm"
            />
          </Grid>
          <Grid item xs={4}>
            <MatchCard
              id="5"
              team1="Ballin Bowlers"
              team2="Nothing but Strikes"
              time="3/30/19 7:00pm"
            />
          </Grid>
          <Grid item xs={4}>
            <MatchCard
              id="6"
              team1="Ballin Bowlers"
              team2="Nothing but Strikes"
              time="3/30/19 7:00pm"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MatchList;
