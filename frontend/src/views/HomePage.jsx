import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import headerLinksStyle from "assets/jss/components/headerLinksStyle.jsx";
import NoAuthHeaderLinks from "components/Header/NoAuthHeaderLinks.jsx";
import AuthHeaderLinks from "components/Header/AuthHeaderLinks.jsx";
import TournamentList from "components/Tournament/TournamentList.jsx";

import Authentication from "components/API/Authentication.js";

class HomePage extends React.Component {
  render() {
    const { classes, login, register, ...rest } = this.props;
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
                <NoAuthHeaderLinks loginPage={login} registerPage={register} />
              )
            }
            {...rest}
          />
        </div>
        <TournamentList />
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HomePage);
