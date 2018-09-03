import React from "react";
import { Link } from "react-router-dom";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <div>
          <GridContainer justify="center">
            <GridItem xs={10} sm={10} md={8}>
              <h1>Page Not found</h1>
              <p>
                Looks like you've followed a broken link or entered a URL that
                doesn't exist on this site.
              </p>
              <Link to="/">Go back to homepage</Link>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default NotFound;
