import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

// core components
import Header from "components/Header/Header.jsx";
import NoAuthHeaderLinks from "components/Header/NoAuthHeaderLinks.jsx";
import AuthHeaderLinks from "components/Header/AuthHeaderLinks.jsx";
import UserAuth from "components/API/UserAuth.js";
import Authentication from "components/API/Authentication.js";
import TournamentAPI from "components/API/TournamentAPI.js";
import MatchList from "components/Match/MatchList.jsx";

import tournamentDetailsStyle from "assets/jss/views/tournamentDetailsStyle.jsx";

class TournamentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.UserAuth = new UserAuth();
    this.state = {
      tournamentName: null,
      tournamentID: this.props.match.params.tournamentID,
      creator: null,
      description: null,
      teamEvent: null,
      location: null,
      scoringType: null,
      tournamentType: null,
      entryCost: null,
      maxParticipants: null,
      startDate: null,
      endDate: null
    };
  }

  async getTournamentDetails(id) {
    let details = undefined;
    try {
      details = await TournamentAPI.getTournament(id);
    } catch (error) {
      this.props.history.push("/NotFound");
      return;
    }
    if (details === undefined) {
      this.props.history.push("/NotFound");
      return;
    }
    if (details.length < 1) {
      this.props.history.push("/NotFound");
      return;
    }
    details = details[0];
    details.teamEvent = details.teamEvent === 0 ? "No" : "Yes";
    details.startDate = new Date(Date.parse(details.startDate)).toDateString();
    details.endDate = new Date(Date.parse(details.endDate)).toDateString();
    this.setState({
      tournamentName: details.tournamentName,
      creator: details.creator,
      description: details.description,
      teamEvent: details.teamEvent,
      location: details.location,
      scoringType: details.scoringType,
      tournamentType: details.tournamentType,
      entryCost: details.entryCost,
      maxParticipants: details.maxParticipants,
      startDate: details.startDate,
      endDate: details.endDate
    });
  }

  async componentDidMount() {
    await this.getTournamentDetails(this.props.match.params.tournamentID);
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <div>
          <Header
            color="primary"
            brand="TournamentBuzz"
            rightLinks={
              Authentication.loggedIn() ? (
                <AuthHeaderLinks />
              ) : (
                <NoAuthHeaderLinks />
              )
            }
            {...rest}
          />
        </div>
        <div className={classes.detailsDiv}>
          <Typography variant="headline" className={classes.detailsText}>
            <b>{this.state.tournamentName}</b>
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Tournament ID:</b> {this.props.match.params.tournamentID}
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Creator:</b> {this.state.creator}
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Description:</b> {this.state.description}
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Location:</b> {this.state.location}
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Scoring Type:</b> {this.state.scoringType}
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Tournament Type:</b> {this.state.tournamentType}
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Team Event:</b> {this.state.teamEvent}
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Entry Cost:</b> {this.state.entryCost}
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Max Participants:</b> {this.state.maxParticipants}
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Start Date:</b> {this.state.startDate}
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>End Date:</b> {this.state.endDate}
          </Typography>
        </div>
        <hr />
        <div>
          <Typography variant="headline" className={classes.detailsText}>
            <b>Upcoming Matches</b>
          </Typography>
          <MatchList tournamentID={this.props.match.params.tournamentID} />
        </div>
      </div>
    );
  }
}

export default withStyles(tournamentDetailsStyle)(TournamentDetails);
