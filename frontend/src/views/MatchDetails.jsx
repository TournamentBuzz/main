import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PencilIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";

// core components
import Header from "components/Header/Header.jsx";
import NoAuthHeaderLinks from "components/Header/NoAuthHeaderLinks.jsx";
import AuthHeaderLinks from "components/Header/AuthHeaderLinks.jsx";
import Authentication from "components/API/Authentication.js";
import MatchAPI from "components/API/MatchAPI.js";
import TournamentAPI from "components/API/TournamentAPI.js";
import RefereeAPI from "components/API/RefereeAPI.js";
import Grid from "@material-ui/core/Grid";

const matchDetailsStyle = {
  detailsText: {
    marginBottom: "10px"
  },
  detailsIcons: {
    float: "right",
    position: "fixed",
    right: "1%"
  }
};

class MatchDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: Authentication.getUID(),
      creator: null,
      tournamentID: this.props.match.params.tournamentID,
      matchID: this.props.match.params.matchID,
      location: null,
      matchTime: null,
      matchName: null,
      teamA: null,
      teamB: null,
      teamAName: null,
      teamBName: null,
      published: null,
      isReferee: false,
      scoreButtonText: "Enter Scores"
    };
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickScores = this.handleClickScores.bind(this);
  }

  handleClickEdit() {
    this.props.history.push(
      `/tournament/${this.state.tournamentID}/match/${this.state.matchID}/edit`
    );
  }

  async handleClickDelete() {
    let confirm = window.confirm("Are you sure you want to delete this match?");
    if (confirm) {
      try {
        await MatchAPI.deleteMatch(this.state.matchID);
      } catch (error) {
        // show message
        return;
      }
      this.props.history.push("/");
    }
  }

  async handleClickScores() {
    if (this.state.scoreButtonText === "Enter Scores") {
      this.setState({ scoreButtonText: "Save Scores" });
    } else {
      this.setState({ scoreButtonText: "Enter Scores" });
    }
  }

  async getMatchDetails(id) {
    let details = undefined;
    try {
      details = await MatchAPI.getMatch(id);
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
    details.matchTime = new Date(
      details.matchTime.slice(0, 19).replace("T", " ") + " UTC"
    ).toLocaleString();
    this.setState(details);
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
    this.setState({ creator: details.creator });
  }

  async componentDidMount() {
    await this.getMatchDetails(this.state.matchID);
    await this.getTournamentDetails(this.state.tournamentID);
    if (this.state.currentUser !== null) {
      const isReferee = await RefereeAPI.isReferee(
        this.state.tournamentID,
        this.state.currentUser
      );
      this.setState({ isReferee: isReferee });
    }
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
        <div>
          <div>
            {this.state.currentUser != null &&
            this.state.currentUser === this.state.creator ? (
              <div className={classes.detailsIcons}>
                <IconButton
                  className={classes.button}
                  aria-label="Delete"
                  onClick={this.handleClickEdit}
                >
                  <PencilIcon />
                </IconButton>
                <IconButton
                  className={classes.button}
                  aria-label="Delete"
                  onClick={this.handleClickDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ) : null}
            <h2>{this.state.matchName}</h2>
          </div>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="headline" className={classes.detailsText}>
                <b>{this.state.teamAName}</b>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="headline" className={classes.detailsText}>
                <b>VS</b>
              </Typography>
              <Typography variant="body1" className={classes.detailsText}>
                {this.state.matchTime}
              </Typography>
              <Typography variant="body1" className={classes.detailsText}>
                {this.state.location}
              </Typography>
              {this.state.isReferee ? (
                <Button
                  style={{ color: "white" }}
                  variant="contained"
                  color="primary"
                  onClick={this.handleClickScores}
                >
                  {this.state.scoreButtonText}
                </Button>
              ) : null}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="headline" className={classes.detailsText}>
                <b>{this.state.teamBName}</b>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(matchDetailsStyle)(MatchDetails);
