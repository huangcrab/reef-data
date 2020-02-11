import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class AddTest extends Component {
  state = {
    calcium: "",
    alkalinity: "",
    magnesium: "",
    ph: "",
    nitrate: "",
    phosphate: "",
    date: moment().format("L"),
    time: moment().format("LT"),
    event: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newTest = {};

    Object.keys(this.state).forEach(key => {
      if (this.state[key] !== "") {
        newTest[key] = this.state[key];
      }
    });
    newTest.date = moment(newTest.date).format("L");
    const { firestore, history } = this.props;

    firestore
      .add({ collection: "parameters" }, newTest)
      .then(() => history.push("/"));
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Test Result</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="calcium">Calcium</label>
                <input
                  type="text"
                  className="form-control"
                  name="calcium"
                  onChange={this.onChange}
                  value={this.state.calcium}
                />
              </div>
              <div className="form-group">
                <label htmlFor="alkalinity">Alkalinity</label>
                <input
                  type="text"
                  className="form-control"
                  name="alkalinity"
                  onChange={this.onChange}
                  value={this.state.alkalinity}
                />
              </div>
              <div className="form-group">
                <label htmlFor="magnesium">Magnesium</label>
                <input
                  type="text"
                  className="form-control"
                  name="magnesium"
                  onChange={this.onChange}
                  value={this.state.magnesium}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ph">PH</label>
                <input
                  type="text"
                  className="form-control"
                  name="ph"
                  onChange={this.onChange}
                  value={this.state.ph}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nitrate">Nitrate</label>
                <input
                  type="text"
                  className="form-control"
                  name="nitrate"
                  onChange={this.onChange}
                  value={this.state.nitrate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phosphate">Phosphate</label>
                <input
                  type="text"
                  className="form-control"
                  name="phosphate"
                  onChange={this.onChange}
                  value={this.state.phosphate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="event">Event</label>
                <input
                  type="text"
                  className="form-control"
                  name="event"
                  onChange={this.onChange}
                  value={this.state.event}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="date"
                  onChange={this.onChange}
                  value={this.state.date}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="text"
                  className="form-control"
                  name="time"
                  onChange={this.onChange}
                  value={this.state.time}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
AddTest.proptypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddTest);
