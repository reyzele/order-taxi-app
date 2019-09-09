import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import OrderForm from "components/OrderForm";
import ProfileAlert from "components/ProfileAlert";
import OrderAlert from "components/OrderAlert";
import { getIsOrderMade } from "modules/Coords";
import { getIsProfileFilled } from "modules/Auth";

const styles = theme => ({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  form: {
    margin: 30,
    maxWidth: 300,
    position: "absolute",
    zIndex: 200,
    top: 70,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    padding: theme.spacing(3)
  }
});

const OrderPage = props => {
  const { classes, isProfile, isOrderMade } = props;

  return (
    <Grid
      container
      spacing={0}
      className={classes.container}
      alignItems="center"
      justify="flex-start"
    >
      <Grid item xs={12} md={8}>
        <Paper className={classes.form}>
          {isProfile && !isOrderMade && <OrderForm />}
          {isProfile && isOrderMade && <OrderAlert />}
          {!isProfile && (
            <ProfileAlert
              header="Fill in billing information"
              body="Enter your bank card information to place an order."
              btnText="go to profile"
              linkTo="/profile"
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  isProfile: getIsProfileFilled(state),
  isOrderMade: getIsOrderMade(state)
});
const mapDispatchToProps = null;

const WrappedOrderPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(OrderPage);

export default WrappedOrderPage;
