import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import tournamentCardStyle from "assets/jss/components/tournamentCardStyle.jsx";

function TournamentCard(props) {
  const { classes, name, sponsor, date } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography className={classes.title} component="h1">
            {name}
          </Typography>
          <Typography color="textSecondary">
            {sponsor + " · " + date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withStyles(tournamentCardStyle)(TournamentCard);
