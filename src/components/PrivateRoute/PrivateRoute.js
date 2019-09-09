import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { getIsLoggedIn } from "modules/Auth";

const PrivateRoute = props => {
  const { component: Component, isLoggedIn, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state)
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
