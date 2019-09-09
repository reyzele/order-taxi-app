import React, { PureComponent, Fragment } from "react";
import { compose } from "redux";
import { Field, reduxForm, change } from "redux-form";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import ProfileAlert from "components/ProfileAlert";
import { renderTextField } from "config/helpers";
import {
  handleProfileSubmit,
  handleProfileClear,
  getProfile
} from "modules/Auth";

const styles = theme => ({
  container: {
    width: "100%",
    height: "100%"
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(3)
  },
  formcolumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  fieldAlign: {
    display: "flex"
  },
  alignLeft: {
    justifyContent: "flex-start"
  },
  alignCenter: {
    justifyContent: "center"
  }
});

const cardNameFormatter = value => {
  if (!value) return "";
  return value.replace(/[^A-Za-z\s]/, "");
};

const cardNumberFormatter = value => {
  if (!value) return "";

  const onlyNum = value.replace(/[^\d\s]/g, "");

  const reg = /\d{1,4}/g;
  return (
    onlyNum &&
    onlyNum
      .substring(0, 16)
      .match(reg)
      .join(" ")
  );
};

const cardNumberParser = value => {
  if (!value) return "";
  return value.replace(/\s/g, "");
};

const expDateFormatter = value => {
  if (!value || value === "/") return "";

  const onlyNum = value.replace(/[^\d\s]/g, "");
  if (onlyNum) {
    let month = onlyNum.substring(0, 2);
    let year = onlyNum.substring(2, 4);
    if (+month > 12) month = "12";

    return `${month}/${year}`;
  } else return "";
};

const cvvFormatter = value => {
  if (!value) return "";

  const onlyNum = value.replace(/[^\d]/, "");
  return onlyNum && onlyNum.substring(0, 3);
};

const profileSyncValidator = values => {
  const requiredFields = ["cardName", "cardNumber", "expDate", "cvv"];
  const errors = {};

  requiredFields.forEach(field => {
    if (!values[field]) errors[field] = "This is a required field";
  });
  if (values["expDate"]) {
    let month = values["expDate"].substring(0, 2);
    let year = values["expDate"].substring(2);
    const date = new Date(+("20" + year), +month - 1);
    if (+date < Date.now()) errors["expDate"] = "Invalid date";
  }
  if (!/^\S+\s\S+$/gi.test(values["cardName"]))
    errors["cardName"] = "Enter the name as on the card";
  if (values["cardNumber"] && values["cardNumber"].length < 16)
    errors["cardNumber"] = "Card number must be 16 digits";
  if (!/^\d{3}$/gi.test(values["cvv"])) errors["cvv"] = "CVV must be 3 digits";
  return errors;
};

class ProfileForm extends PureComponent {
  state = {
    isUpdated: false
  };

  requiredFields = ["cardName", "cardNumber", "expDate", "cvv"];

  handleSubmit = values => {
    const { handleProfileSubmit } = this.props;
    this.setState({
      ...this.state,
      isUpdated: true
    });
    handleProfileSubmit({ ...values });
  };

  handleClear = () => {
    const { handleProfileClear, change } = this.props;
    this.setState({
      isUpdated: false
    });
    this.requiredFields.forEach(field => change(field, ""));
    handleProfileClear();
  };

  renderForm = () => {
    const { classes, handleSubmit } = this.props;

    return (
      <Fragment>
        <Paper component="form" onSubmit={handleSubmit(this.handleSubmit)}>
          <Grid container spacing={2} className={classes.form}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                className={`${classes.alignCenter} ${classes.fieldAlign}`}
              >
                Profile
              </Typography>
              <Typography
                variant="h6"
                className={`${classes.alignLeft} ${classes.fieldAlign}`}
              >
                Payment method
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Field
                name="cardName"
                component={renderTextField}
                label="Owner`s name"
                type="text"
                required
                fullWidth
                format={cardNameFormatter}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Field
                name="cardNumber"
                component={renderTextField}
                label="Card number"
                required
                fullWidth
                format={cardNumberFormatter}
                parse={cardNumberParser}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Field
                name="expDate"
                component={renderTextField}
                label="Expiration date"
                required
                fullWidth
                placeholder="__ /__"
                InputLabelProps={{ shrink: true }}
                format={expDateFormatter}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Field
                name="cvv"
                component={renderTextField}
                label="CVV"
                required
                fullWidth
                format={cvvFormatter}
              />
            </Grid>
            <Grid
              item
              xs={6}
              className={`${classes.alignLeft} ${classes.fieldAlign}`}
            >
              <Button
                variant="contained"
                color="primary"
                component="button"
                type="submit"
              >
                Save
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              className={`${classes.alignLeft} ${classes.fieldAlign}`}
            >
              <Button
                variant="contained"
                color="primary"
                component="button"
                onClick={this.handleClear}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Fragment>
    );
  };

  renderAlert = () => {
    const { classes } = this.props;
    return (
      <Fragment>
        <Paper className={classes.form}>
          <ProfileAlert
            header="Profile"
            body="Billing information updated. Now you can order a taxi."
            btnText="Go to map"
            linkTo="/map"
          />
        </Paper>
      </Fragment>
    );
  };

  render() {
    const { classes } = this.props;
    const { isUpdated } = this.state;
    return (
      <Grid
        container
        spacing={0}
        className={classes.container}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={10} md={6}>
          {isUpdated ? this.renderAlert() : this.renderForm()}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: getProfile(state)
});
const mapDispatchToProps = {
  handleProfileSubmit,
  handleProfileClear,
  change
};

const WrappedProfileForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles),
  reduxForm({ form: "profileform", validate: profileSyncValidator })
)(ProfileForm);

export default WrappedProfileForm;
