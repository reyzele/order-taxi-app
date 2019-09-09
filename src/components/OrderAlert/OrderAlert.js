import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { getCoordsError, setIsOrderMade } from "modules/Coords";

const styles = () => ({
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

class OrderAlert extends PureComponent {
  handleClick = () => {
    const { setIsOrderMade } = this.props;
    setIsOrderMade(false);
  };

  render() {
    const { classes, errorCoords } = this.props;

    return (
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          className={`${classes.alignCenter} ${classes.fieldAlign}`}
        >
          <Typography variant="h4">Order placed</Typography>
        </Grid>
        <Grid item xs={12}>
          {errorCoords && (
            <Typography variant="body1">{errorCoords}</Typography>
          )}
          {!errorCoords && (
            <Typography variant="body1">
              Your taxi is on its way to you. Will arrive in about 10 minutes
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          className={`${classes.alignLeft} ${classes.fieldAlign}`}
        >
          <Button
            variant="outlined"
            color="primary"
            component="button"
            onClick={this.handleClick}
          >
            Make a new order
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  errorCoords: getCoordsError(state)
});
const mapDispatchToProps = { setIsOrderMade };

const WrappedOrderAlert = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(OrderAlert);

export default WrappedOrderAlert;
