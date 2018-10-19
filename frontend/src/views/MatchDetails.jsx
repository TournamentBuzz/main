import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PencilIcon from "@material-ui/icons/Create";

// core components
import Header from "components/Header/Header.jsx";
import NoAuthHeaderLinks from "components/Header/NoAuthHeaderLinks.jsx";
import AuthHeaderLinks from "components/Header/AuthHeaderLinks.jsx";
import Authentication from "components/API/Authentication.js";
import MatchAPI from "components/API/MatchAPI.js";
import TournamentAPI from "components/API/TournamentAPI.js";
import Grid from "@material-ui/core/Grid";

const matchDetailsStyle = {
  detailsText: {
    marginBottom: "10px"
  },
  detailsIcons: {
    float: "right"
  }
};

class MatchDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: Authentication.getUID(),
      creator: null,
      tournamentID: this.props.match.params.tournamentID,
      matchID: this.props.match.params.matchID
    };
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
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
    await this.getTournamentDetails(this.state.tournamentID);
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
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="headline" className={classes.detailsText}>
                <b>Ballin Bowlers</b>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="headline" className={classes.detailsText}>
                <b>VS</b>
              </Typography>
              <Typography variant="body1" className={classes.detailsText}>
                3/29/2019 @ 7:00
              </Typography>
              <Typography variant="body1" className={classes.detailsText}>
                Tech Rec
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="headline" className={classes.detailsText}>
                <b>Nothing but Strikes</b>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(matchDetailsStyle)(MatchDetails);
