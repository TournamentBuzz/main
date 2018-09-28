import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import matchCardStyle from "assets/jss/components/matchCardStyle.jsx";

class MatchCard extends React.Component {
  handleClick(id) {
    this.props.history.push(
      `/tournament/${this.props.match.params.tournamentID}/match/${id}`
    );
  }

  render() {
    const { classes, id, team1, team2, time } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea onClick={() => this.handleClick(id)}>
          <CardContent>
            <Typography className={classes.title} component="h1">
              {team1 + " vs " + team2}
            </Typography>
            <Typography color="textSecondary">{time}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withRouter(withStyles(matchCardStyle)(MatchCard));
