import React, { Component } from "react";
import { connect } from "react-redux";
import { allowRegistration } from "../../actions/settingActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Settings extends Component {
  onCheckChange = () => {
    this.props.allowRegistration();
  };

  render() {
    const { allowRegistration } = this.props.setting;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/">
              <i className="fas fa-arrow-circle-left" />
              Back to Dashboard
            </Link>
            <h3>Settings</h3>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Allow Registration: </label>{" "}
                    <input
                      name="allowRegistration"
                      type="checkbox"
                      checked={allowRegistration}
                      onChange={this.onCheckChange}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  setting: PropTypes.object.isRequired,
  allowRegistration: PropTypes.func.isRequired
};

export default connect(
  state => ({ setting: state.setting }),
  { allowRegistration }
)(Settings);
