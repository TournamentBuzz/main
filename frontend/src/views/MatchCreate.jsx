import React from "react";
import { withRouter } from "react-router-dom";

import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

import Header from "components/Header/Header.jsx";
import NoAuthHeaderLinks from "components/Header/NoAuthHeaderLinks.jsx";
import AuthHeaderLinks from "components/Header/AuthHeaderLinks.jsx";
import MatchAPI from "components/API/MatchAPI";
import Authentication from "components/API/Authentication";

class MatchCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      formError: "",
      tournamentId: this.props.match.params.tournamentID,
      location: "",
      details: "",
      matchName: "",
      matchTime: "",
      teamA: "",
      teamB: ""
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    if (!Authentication.loggedIn()) {
      this.props.history.push("/login");
    }
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    await MatchAPI.createMatch(
      this.state.tournamentId,
      this.state.location,
      this.state.details,
      this.state.matchName,
      new Date(this.state.matchTime)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      this.state.teamA,
      this.state.teamB
    );
    this.props.history.push(`/tournament/${this.state.tournamentId}`);
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
          <form onSubmit={this.handleFormSubmit}>
            <h2>Create Match</h2>
            <FormHelperText error>{this.state.formError}</FormHelperText>

            <div>
              <FormControl>
                <InputLabel>Match Name</InputLabel>
                <Input
                  value={this.state.matchName}
                  required={true}
                  onChange={e => this.setState({ matchName: e.target.value })}
                  id="matchName"
                  fullWidth={true}
                />
                <FormHelperText>
                  {this.state.submitted && !this.state.name
                    ? "Match Name is required"
                    : ""}
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <InputLabel>Location</InputLabel>
                <Input
                  value={this.state.location}
                  onChange={e => this.setState({ location: e.target.value })}
                  id="location"
                  fullWidth={true}
                />
                <FormHelperText>
                  {this.state.submitted && !this.state.location
                    ? "Location is required"
                    : ""}
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <InputLabel>Details</InputLabel>
                <Input
                  value={this.state.Details}
                  onChange={e => this.setState({ Details: e.target.value })}
                  id="Details"
                  fullWidth={true}
                />
                <FormHelperText />
              </FormControl>
            </div>
            <div>
              <FormControl>
                <InputLabel shrink={true}>Match Date & Time</InputLabel>
                <Input
                  type="datetime-local"
                  onChange={e => this.setState({ matchTime: e.target.value })}
                  id="matchTime"
                  fullWidth={true}
                  required={true}
                  placeholder=""
                />
                <FormHelperText>
                  {this.state.submitted && !this.state.matchTime
                    ? "Match Time is required"
                    : ""}
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <InputLabel>Team A</InputLabel>
                <Input
                  value={this.state.teamA}
                  required={true}
                  onChange={e => this.setState({ teamA: e.target.value })}
                  id="teamA"
                  fullWidth={true}
                />
                <FormHelperText>
                  {this.state.submitted && !this.state.teamA
                    ? "Team A is required"
                    : ""}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel>Team B</InputLabel>
                <Input
                  value={this.state.teamB}
                  required={true}
                  onChange={e => this.setState({ teamB: e.target.value })}
                  id="teamB"
                  fullWidth={true}
                />
                <FormHelperText>
                  {this.state.submitted && !this.state.teamB
                    ? "Team B is required"
                    : ""}
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <Button
                simple
                color="primary"
                size="lg"
                value="submit"
                type="submit"
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(MatchCreate);
