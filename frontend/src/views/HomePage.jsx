import React from "react";

// @material-ui/core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Button from "components/CustomButtons/Button.jsx";
import headerLinksStyle from "assets/jss/components/headerLinksStyle.jsx";

//import LoginBox from 'views/LoginBox'; (later...)

//const dashboardRoutes = [];

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      openLeft: false,
      openTop: false,
      openBottom: false,
      openRight: false
    };
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="primary"
          //routes={dashboardRoutes}
          brand="TournamentBuzz"
          rightLinks={
            <List className={classes.list}>
              <ListItem className={classes.listItem}>
                  <Button
                    color="warning"
                    href="#"
                    className={classes.navLink}
                  >
                    Register
                  </Button>
              </ListItem>
              <ListItem className={classes.listItem}>
                  <Button
                    color="success"
                    href="#"
                    className={classes.navLink}
                  >
                    Login
                  </Button>
              </ListItem>
            </List>
          }
          fixed
          {...rest}
        />
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HomePage);
