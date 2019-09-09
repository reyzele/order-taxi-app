import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  fetchCoordsRequest,
  getIsLoadingCoords,
  setIsOrderMade
} from "modules/Coords";
import {
  fetchAddressesRequest,
  getIsLoadingAddresses,
  getLoadErrorText,
  getMyAddresses
} from "modules/Addresses";

const styles = theme => ({
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

class OrderForm extends PureComponent {
  state = {
    address1: "",
    address2: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleButtonClick = () => {
    const { fetchCoordsRequest, setIsOrderMade } = this.props;
    const { address1, address2 } = this.state;

    if (address1 && address2) fetchCoordsRequest({ address1, address2 });
    setIsOrderMade(true);
    this.setState({
      ...this.state,
      address1: "",
      address2: ""
    });
  };

  componentDidMount() {
    const { fetchAddressesRequest, MyAddresses } = this.props;

    if (!MyAddresses || MyAddresses.length === 0) fetchAddressesRequest();
  }

  renderInputs = () => {
    const { classes, MyAddresses } = this.props;
    const { address1, address2 } = this.state;

    return (
      <Fragment>
        <Grid
          item
          xs={12}
          className={`${classes.alignCenter} ${classes.fieldAlign}`}
        >
          {
            <TextField
              id="address-1"
              name="address1"
              select
              margin="normal"
              label="Departure way"
              value={this.state.address1}
              onChange={this.handleChange}
              fullWidth
            >
              <MenuItem value="">Departure way</MenuItem>
              {MyAddresses.map(address =>
                address2 === address ? null : (
                  <MenuItem key={address} value={address}>
                    {address}
                  </MenuItem>
                )
              )}
            </TextField>
          }
        </Grid>
        <Grid
          item
          xs={12}
          className={`${classes.alignCenter} ${classes.fieldAlign}`}
        >
          {
            <TextField
              id="address-2"
              name="address2"
              select
              margin="normal"
              label="Destination"
              value={this.state.address2}
              onChange={this.handleChange}
              fullWidth
            >
              <MenuItem value="">Destination</MenuItem>
              {MyAddresses.map(address =>
                address1 === address ? null : (
                  <MenuItem key={address} value={address}>
                    {address}
                  </MenuItem>
                )
              )}
            </TextField>
          }
        </Grid>
      </Fragment>
    );
  };

  render() {
    const { classes, isLoadingAddresses, errorText } = this.props;
    const { address1, address2 } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          className={`${classes.alignCenter} ${classes.fieldAlign}`}
        >
          <Typography variant="h4">Order taxi</Typography>
        </Grid>
        {errorText && (
          <Grid
            item
            xs={12}
            className={`${classes.alignCenter} ${classes.fieldAlign}`}
          >
            <Typography variant="body1">{errorText}</Typography>
          </Grid>
        )}

        {isLoadingAddresses ? (
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
            component="button"
            disabled={!address1 || !address2}
            onClick={this.handleButtonClick}
          >
            Call a taxi
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isLoadingAddresses: getIsLoadingAddresses(state),
  errorText: getLoadErrorText(state),
  MyAddresses: getMyAddresses(state),
  isLoadingCoords: getIsLoadingCoords(state)
});
const mapDispatchToProps = {
  fetchAddressesRequest,
  fetchCoordsRequest,
  setIsOrderMade
};

const WrappedOrderForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(OrderForm);

export default WrappedOrderForm;
