import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import headerLinksStyle from "assets/jss/components/headerLinksStyle.jsx";
import NoAuthHeaderLinks from "components/Header/NoAuthHeaderLinks.jsx";
import AuthHeaderLinks from "components/Header/AuthHeaderLinks.jsx";
import TournamentList from "components/Tournament/TournamentList.jsx";

import UserAuth from "components/API/UserAuth.js";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.UserAuth = new UserAuth();
  }

  render() {
    const { classes, login, register, ...rest } = this.props;
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
