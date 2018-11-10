import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

// core components
import Header from "components/Header/Header.jsx";
import NoAuthHeaderLinks from "components/Header/NoAuthHeaderLinks.jsx";
import AuthHeaderLinks from "components/Header/AuthHeaderLinks.jsx";
import Authentication from "components/API/Authentication.js";
import TeamAPI from "components/API/TeamAPI.js";

const teamDetailsStyle = {
  detailsText: {
    marginBottom: "10px"
  },
  detailsIcons: {
    float: "right",
    position: "fixed",
    right: "1%"
  }
};

class TeamDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamID: this.props.match.params.teamID,
      teamName: null,
      leader: null,
      tournamentID: null,
      seed: null,
      membersList: null,
      currentUser: Authentication.getUID()
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  async handleClickDelete() {
    let confirm = window.confirm("Are you sure you want to delete this team?");
    if (confirm) {
      try {
        await TeamAPI.withdrawTeam(this.state.teamID, this.state.tournamentID);
      } catch (error) {
        // show message
        return;
      }
      this.props.history.push("/");
    }
  }

  async getTeamDetails(id) {
    let details = undefined;
    try {
      details = await TeamAPI.getTeam(id);
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
    this.setState(details);
  }

  async getTeamMembers(id) {
    let members = undefined;
    try {
      members = await TeamAPI.getTeamMembers(id);
    } catch (error) {
      return;
    }
    if (members === undefined || members.length < 1) {
      return;
    }
    let list = [];
    for (let member of members) {
      let listItem = (
        <ListItem>
          <ListItemText primary="Single-line item" />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
      list.push(listItem);
    }
    this.setState({ membersList: list });
  }

  async componentDidMount() {
    await this.getTeamDetails(this.state.teamID);
    await this.getTeamMembers(this.state.teamID);
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
            this.state.currentUser === this.state.leader ? (
              <div className={classes.detailsIcons}>
                <IconButton
                  className={classes.button}
                  aria-label="Delete"
                  onClick={this.handleClickDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ) : null}
            <h2>{this.state.teamName}</h2>
            <br />
            <h3>Members</h3>
            {this.state.membersList === null ? (
              <div>{null}</div>
            ) : (
              <List>{this.state.membersList}</List>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(teamDetailsStyle)(TeamDetails);
