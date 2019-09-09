import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { logout, getIsLoggedIn } from "modules/Auth";
import { setIsOrderMade } from "modules/Coords";
class Header extends PureComponent {
  handleLogout = () => {
    const { logout, setIsOrderMade } = this.props;
    setIsOrderMade(false);
    logout();
  };

  render() {
    const { isLoggedIn } = this.props;

    return (
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            Taxi ordering app
          </Typography>
          <Button component={Link} to="/map" color="default">
            Map
          </Button>
          <Button component={Link} to="/profile" color="default">
            Profile
          </Button>
          {isLoggedIn ? (
            <Button
              component={Link}
              to="/login"
              color="default"
              onClick={this.handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button component={Link} to="/login" color="default">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state)
});
const mapDispatchToProps = { logout, setIsOrderMade };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
