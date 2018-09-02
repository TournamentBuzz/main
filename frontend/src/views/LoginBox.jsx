import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import { Email, LockOutlined } from "@material-ui/icons";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginBoxStyle from "assets/jss/views/loginBoxStyle.jsx";

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: ""
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  handleFormSubmit(e) {
    e.preventDefault();
    console.log("submitted");
    if (this.state.loginEmail && this.state.loginPassword) {
      console.log(this.state.loginEmail);
      console.log(this.state.loginPassword);
    }
  }

  render() {
    //const { classes, ...rest } = this.props;
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <Card className={classes[this.state.cardAnimaton]}>
                <form className={classes.form} onSubmit={this.handleFormSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h2>Login</h2>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Email"
                      id="loginEmail"
                      name="loginEmail"
                      onChange={this.handleChange.bind(this)}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="loginPassword"
                      name="loginPassword"
                      onChange={this.handleChange.bind(this)}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockOutlined className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" value="submit" type="submit">
                      Login
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(loginBoxStyle)(LoginBox);
