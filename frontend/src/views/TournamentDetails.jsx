import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

// core components
import Header from "components/Header/Header.jsx";
import NoAuthHeaderLinks from "components/Header/NoAuthHeaderLinks.jsx";
import AuthHeaderLinks from "components/Header/AuthHeaderLinks.jsx";
import UserAuth from "components/API/UserAuth.js";

import tournamentDetailsStyle from "assets/jss/components/tournamentDetailsStyle.jsx";

class TournamentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.UserAuth = new UserAuth();
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
              this.UserAuth.loggedIn() ? (
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
            <b>TournamentName</b>
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Tournament ID:</b> {this.props.match.params.id}
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Creator:</b> Sample
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Description:</b> Sample
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Location:</b> Sample
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Scoring Type:</b> Sample
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Entry Cost:</b> Sample
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>Start Date:</b> Sample
          </Typography>
          <Typography variant="body1" className={classes.detailsText}>
            <b>End Date:</b> Sample
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(tournamentDetailsStyle)(TournamentDetails);
