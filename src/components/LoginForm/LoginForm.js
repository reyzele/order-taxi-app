import React, { PureComponent } from "react";
import { Field, reduxForm, isSubmitting } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import { login, auth, getIsLoggedIn } from "modules/Auth";
import { renderTextField } from "config/helpers";

const styles = theme => ({
  container: {
    width: "100%",
    height: "100%"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    padding: theme.spacing(3)
  },
  fieldAlign: {
    display: "flex"
  },
  alignLeft: {
    justifyContent: "flex-start"
  },
  alignCenter: {
    justifyContent: "center"
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 192
  }
});

class LoginForm extends PureComponent {
  renderInputs = () => {
    const { classes } = this.props;

    return (
      <>
        <Grid
          item
          xs={12}
          className={`${classes.alignLeft} ${classes.fieldAlign}`}
        >
          <Field
            name="userName"
            component={renderTextField}
            label="Username"
            type="text"
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={12}
          className={`${classes.alignLeft} ${classes.fieldAlign}`}
        >
          <Field
            name="userPassword"
            component={renderTextField}
            label="Password"
            type="password"
            fullWidth
          />
        </Grid>
      </>
    );
  };

  renderForm = () => {
    const { classes, handleSubmit, isSubmitting } = this.props;

    return (
      <Grid
        container
        spacing={0}
        className={classes.container}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={8} sm={6} md={4}>
          <Paper component="form" onSubmit={handleSubmit(this.handleSubmit)}>
            <Grid container spacing={2} className={classes.form}>
              <Grid
                item
                xs={12}
                className={`${classes.alignCenter} ${classes.fieldAlign}`}
              >
                <Typography variant="h4">Login</Typography>
              </Grid>
              {isSubmitting ? (
                <Grid item xs={12} className={classes.loader}>
                  <CircularProgress />
                </Grid>
              ) : (
                this.renderInputs()
              )}
              <Grid
                item
                xs={12}
                className={`${classes.alignLeft} ${classes.fieldAlign}`}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  component="button"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  handleSubmit = values => {
    const { userName: username, userPassword: password } = values;
    const { auth } = this.props;

    auth({ username, password });
  };

  render() {
    const { isLoggedIn } = this.props;

    return isLoggedIn ? <Redirect to="/map" /> : this.renderForm();
  }
}

const loginSyncValidator = values => {
  const errors = {};
  if (!values.userName) {
    errors.userName = "Please enter your login";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userName)
  ) {
    errors.userName = "It should be your e-mail";
  }
  if (!values.userPassword) errors.userPassword = "Please enter your password";
  return errors;
};

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  isSubmitting: isSubmitting("loginform")(state)
});
const mapDispatchToProps = { login, auth };

const WrappedLoginForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles),
  reduxForm({ form: "loginform", validate: loginSyncValidator })
)(LoginForm);

export default WrappedLoginForm;
