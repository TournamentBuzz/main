import React from "react";

import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardFooter from "components/Card/CardFooter";
import Button from "components/CustomButtons/Button";

const dateOptions = {
  hour12: true,
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
};

class TournamentCreate extends React.Component {
  constructor(props) {
    super(props);
    const startDate = new Date(Date.now());
    const endDate = new Date(Date.now());
    this.state = {
      submitted: false,
      formError: "",
      name: "",
      teamEvent: false,
      location: "",
      scoringType: "Points",
      tournamentType: "Single Elim",
      entryCost: "",
      maxParticipants: "",
      startDate: startDate.toLocaleString("en-US", dateOptions),
      endDate: endDate.toLocaleString("en-US", dateOptions)
    };
    this.canSubmit = this.canSubmit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  canSubmit() {
    return true;
  }

  async handleFormSubmit() {
    return true;
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Card>
        <form onSubmit={this.handleFormSubmit}>
          <CardHeader color="primary">
            <h2>Create Tournament</h2>
          </CardHeader>
          <CardBody>
            <FormHelperText error>{this.state.formError}</FormHelperText>

            <div>
              <FormControl>
                <InputLabel>Tournament Name</InputLabel>
                <Input
                  value={this.state.name}
                  onChange={this.handleChange}
                  name="name"
                  id="name"
                  fullWidth={true}
                />
                <FormHelperText>
                  {this.state.submitted && !this.state.name
                    ? "Tournament Name is required"
                    : ""}
                </FormHelperText>
              </FormControl>
            </div>

            <div>
              <FormControl>
                <InputLabel>Team Event</InputLabel>
                <Select
                  value={this.state.teamEvent}
                  inputProps={{
                    name: "teamEvent",
                    id: "teamEvent"
                  }}
                  onChange={this.handleChange}
                >
                  <MenuItem value={false}>Individual</MenuItem>
                  <MenuItem value={true}>Team</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl>
                <InputLabel>Location</InputLabel>
                <Input
                  value={this.state.location}
                  onChange={this.handleChange}
                  name="location"
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
                <InputLabel>Tournament Type</InputLabel>
                <Select
                  value={this.state.tournamentType}
                  inputProps={{
                    name: "tournamentType",
                    id: "tournamentType"
                  }}
                  onChange={this.handleChange}
                >
                  <MenuItem value="Single Elim">Single Elimination</MenuItem>
                  <MenuItem value="Double Elim">Double Elimination</MenuItem>
                  <MenuItem value="Round-robin">Round Robin</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl>
                <InputLabel>Entry Cost</InputLabel>
                <Input
                  value={this.state.entryCost}
                  onChange={this.handleChange}
                  name="entryCost"
                  id="entryCost"
                  fullWidth={true}
                />
                <FormHelperText>
                  {this.state.submitted && !this.state.entryCost
                    ? "Entry Cost is required"
                    : ""}
                  {!Number.isInteger(Number(this.state.entryCost))
                    ? "Entry Cost must be a whole dollar amount"
                    : ""}
                </FormHelperText>
              </FormControl>
            </div>

            <div>
              <FormControl>
                <InputLabel>Max Participants</InputLabel>
                <Input
                  value={this.state.maxParticipants}
                  onChange={this.handleChange}
                  name="maxParticipants"
                  id="maxParticipants"
                  fullWidth={true}
                />
                <FormHelperText>
                  {this.state.submitted && !this.state.maxParticipants
                    ? "Max Participants is required"
                    : ""}
                  {!Number.isInteger(Number(this.state.maxParticipants))
                    ? "Max Participants must be a number"
                    : ""}
                </FormHelperText>
              </FormControl>
            </div>

            <div>
              <FormControl>
                <InputLabel>Start Date</InputLabel>
                <Input
                  value={this.state.startDate}
                  type="date"
                  onChange={this.handleChange}
                  name="startDate"
                  id="startDate"
                  fullWidth={true}
                  required={true}
                />
                <FormHelperText>
                  {this.state.submitted && !this.state.startDate
                    ? "Start Date is required"
                    : ""}
                </FormHelperText>
              </FormControl>
            </div>

            <div>
              <FormControl>
                <InputLabel>End Date</InputLabel>
                <Input
                  value={this.state.endDate}
                  type="date"
                  onChange={this.handleChange}
                  name="endDate"
                  id="endDate"
                  fullWidth={true}
                  required={true}
                />
                <FormHelperText>
                  {this.state.submitted && !this.state.endDate
                    ? "End Date is required"
                    : ""}
                </FormHelperText>
              </FormControl>
            </div>
          </CardBody>
          <CardFooter>
            <Button
              simple
              color="primary"
              size="lg"
              value="submit"
              type="submit"
            >
              Create
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }
}

export default withStyles(() => ({}))(TournamentCreate);
