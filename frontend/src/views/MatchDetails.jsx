import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

// core components
import Header from "components/Header/Header.jsx";
import NoAuthHeaderLinks from "components/Header/NoAuthHeaderLinks.jsx";
import AuthHeaderLinks from "components/Header/AuthHeaderLinks.jsx";
import UserAuth from "components/API/UserAuth.js";
import Grid from "@material-ui/core/Grid";

const matchDetailsStyle = {
  detailsText: {
    marginBottom: "10px"
  }
};

class matchDetails extends React.Component {
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
        <div>
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

export default withStyles(matchDetailsStyle)(matchDetails);
