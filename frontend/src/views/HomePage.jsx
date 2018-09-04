import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import headerLinksStyle from "assets/jss/components/headerLinksStyle.jsx";

import NoAuthHeaderLinks from "components/Header/NoAuthHeaderLinks.jsx";
//import AuthHeaderLinks from "components/Header/AuthHeaderLinks.jsx";

class HomePage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="primary"
          brand="TournamentBuzz"
          rightLinks={<NoAuthHeaderLinks />}
          fixed
          {...rest}
        />
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HomePage);
