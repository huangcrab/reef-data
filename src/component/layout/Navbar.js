import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Navbar extends Component {
  state = {
    isAuthenticated: false,
    auth: {}
  };

  static getDerivedStateFromProps(nextProps) {
    const { auth } = nextProps;

    if (auth.uid != null) {
      return { isAuthenticated: true, auth };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = () => {
    this.props.firebase.logout();
  };

  render() {
    const { isAuthenticated, auth } = this.state;

    return (
      <div>
        <div className="navbar navbar-expand-md navbar-light bg-light mb-4">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Reef Data
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarMain"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                {isAuthenticated ? (
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                ) : null}
              </ul>

              {isAuthenticated ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <button className="btn nav-link">
                      Hello, {auth.email}
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      onClick={this.onLogoutClick}
                      className="btn nav-link"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(state => ({ auth: state.firebase.auth }))
)(Navbar);
