import React, { Component } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import { setNotification } from "../../actions/notifyActions";

import Message from "../layout/Message";
class Login extends Component {
  state = {
    email: "",
    password: "",
    notify: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.notify) {
      return { notify: nextProps.notify };
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;
    firebase
      .login({
        email,
        password
      })
      .catch(err => {
        this.props.setNotification("danger", "Invalid Login Credentials!");
      });
  };

  render() {
    const { notify } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            {notify.message ? <Message {...notify} /> : null}

            <div className="card">
              <div className="card-body">
                <h1 className="text-center pb-4 pt-3">
                  <span className="text-dark">
                    <i className="fas fa-lock" /> Login
                  </span>
                </h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      required
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      required
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>

                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-block btn-dark"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notify: state.notify
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { setNotification }
  )
)(Login);
