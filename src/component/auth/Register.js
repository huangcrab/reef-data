import React, { Component } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import { setNotification } from "../../actions/notifyActions";
import { Redirect } from "react-router-dom";
import Message from "../layout/Message";

class Register extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
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
    const { email, password1, password2 } = this.state;

    if (password1 === password2) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password1)
        .then(user => console.log(user))
        .catch(err => this.props.setNotification("danger", err.message));
    } else {
      this.props.setNotification("danger", "password does not match");
    }
  };

  render() {
    if (!this.props.setting.allowRegistration) {
      return <Redirect to={"/"} />;
    }
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
                    <i className="fas fa-lock" /> Register
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
                    <label htmlFor="password1">Password</label>
                    <input
                      type="password"
                      name="password1"
                      className="form-control"
                      required
                      value={this.state.password1}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                      type="password"
                      name="password2"
                      className="form-control"
                      required
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                  </div>

                  <input
                    type="submit"
                    value="Register"
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

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  setting: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notify: state.notify,
  setting: state.setting
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { setNotification }
  )
)(Register);
