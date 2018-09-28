import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardFooter from "components/Card/CardFooter";
import CustomInput from "components/CustomInput/CustomInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "components/CustomButtons/Button";

import registrationBoxStyle from "assets/jss/views/registrationBoxStyle";
import UserAuth from "components/API/UserAuth";

class TournamentCreate extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new UserAuth();
    this.state = {
      submitted: false,
      formError: "",
      name: "",
      teamEvent: "",
      location: "",
      scoringType: "",
      tournamentType: "",
      entryCost: "",
      maxParticipants: "",
      startDate: Date.now()
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
    const { classes, ...rest } = this.props;
    return (
      <Card className={classes[this.state.cardAnimaton]}>
        <form className={classes.form} onSubmit={this.handleFormSubmit}>
          <CardHeader color="primary" className={classes.cardHeader}>
            <h2>Create Tournament</h2>
          </CardHeader>
          <CardBody>
            <FormHelperText error>{this.state.formError}</FormHelperText>
            <CustomInput
              labelText="Tournament Name"
              id="name"
              name="name"
              onChange={this.handleChange}
              formHelperText={
                this.state.submitted && !this.state.name
                  ? "Tournament Name is required"
                  : ""
              }
              formControlProps={{ fullWidth: true }}
            />
            <CustomInput
              labelText="Team Event"
              id="teamEvent"
              name="teamEvent"
              onChange={this.handleChange}
              formHelperText={
                this.state.submitted && !this.state.teamEvent
                  ? "Team Event is required"
                  : ""
              }
              formControlProps={{ fullWidth: true }}
            />
            <CustomInput
              labelText="Location"
              id="location"
              name="location"
              onChange={this.handleChange}
              formHelperText={
                this.state.submitted && !this.state.location
                  ? "Location is required"
                  : ""
              }
              formControlProps={{ fullWidth: true }}
            />
            <CustomInput
              labelText="Scoring Type"
              id="scoringType"
              name="scoringType"
              onChange={this.handleChange}
              formHelperText={
                this.state.submitted && !this.state.scoringType
                  ? "Scoring Type is required"
                  : ""
              }
              formControlProps={{ fullWidth: true }}
            />
            <CustomInput
              labelText="Tournament Type"
              id="tournamentType"
              name="tournamentType"
              onChange={this.handleChange}
              formHelperText={
                this.state.submitted && !this.state.tournamentType
                  ? "Tournament Type is required"
                  : ""
              }
              formControlProps={{ fullWidth: true }}
            />
            <CustomInput
              labelText="Entry Cost"
              id="entryCost"
              name="entryCost"
              onChange={this.handleChange}
              formHelperText={
                this.state.submitted && !this.state.entryCost
                  ? "Entry Cost is required"
                  : ""
              }
              formControlProps={{ fullWidth: true }}
            />
            <CustomInput
              labelText="Max Participants"
              id="maxParticipants"
              name="maxParticipants"
              onChange={this.handleChange}
              formHelperText={
                this.state.submitted && !this.state.maxParticipants
                  ? "Max Participants is required"
                  : ""
              }
              formControlProps={{ fullWidth: true }}
            />
            <CustomInput
              labelText="Start Date"
              id="startDate"
              name="startDate"
              type="datetime-local"
              onChange={this.handleChange}
              formHelperText={
                this.state.submitted && !this.state.startDate
                  ? "Start Date is required"
                  : ""
              }
              formControlProps={{ fullWidth: true }}
            />
          </CardBody>
          <CardFooter className={classes.cardFooter}>
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

export default withStyles(registrationBoxStyle)(TournamentCreate);
