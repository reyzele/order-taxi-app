import React, { PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "components/Header";
import PrivateRoute from "components/PrivateRoute";
import LoginForm from "components/LoginForm";
import MapBox from "components/MapBox";
import ProfileForm from "components/ProfileForm";

class RootRouter extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Redirect path="/" exact to="login" />
          <PrivateRoute path="/map" component={MapBox} />
          <PrivateRoute path="/profile" component={ProfileForm} />
        </Switch>
      </>
    );
  }
}

export default RootRouter;
