import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../../component/layout/Spinner";
import { Link } from "react-router-dom";

class EditTest extends Component {
  constructor(props) {
    super(props);

    this.alkalinity = React.createRef();
    this.calcium = React.createRef();
    this.phosphate = React.createRef();
    this.ph = React.createRef();
    this.nitrate = React.createRef();
    this.event = React.createRef();
    this.date = React.createRef();
    this.time = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const newTest = {
      calcium: this.calcium.current.value,
      alkalinity: this.alkalinity.current.value,
      phosphate: this.phosphate.current.value,
      ph: this.ph.current.value,
      nitrate: this.nitrate.current.value,
      event: this.event.current.value,
      date: this.date.current.value,
      time: this.time.current.value
    };
    const { test, firestore, history } = this.props;

    firestore
      .update({ collection: "parameters", doc: test.id }, newTest)
      .then(() => history.push(`/test/${test.id}`));
  };

  render() {
    const { test } = this.props;
    return test ? (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to={`/test/${test.id}`} className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Details
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Edit Test Result</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="calcium">Calcium</label>
                <input
                  type="text"
                  className="form-control"
                  name="calcium"
                  ref={this.calcium}
                  defaultValue={test.calcium}
                />
              </div>
              <div className="form-group">
                <label htmlFor="alkalinity">Alkalinity</label>
                <input
                  type="text"
                  className="form-control"
                  name="alkalinity"
                  ref={this.alkalinity}
                  defaultValue={test.alkalinity}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ph">PH</label>
                <input
                  type="text"
                  className="form-control"
                  name="ph"
                  ref={this.ph}
                  defaultValue={test.ph}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nitrate">Nitrate</label>
                <input
                  type="text"
                  className="form-control"
                  name="nitrate"
                  ref={this.nitrate}
                  defaultValue={test.nitrate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phosphate">Phosphate</label>
                <input
                  type="text"
                  className="form-control"
                  name="phosphate"
                  ref={this.phosphate}
                  defaultValue={test.phosphate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="event">Event</label>
                <input
                  type="text"
                  className="form-control"
                  name="event"
                  ref={this.event}
                  defaultValue={test.event}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  data-date=""
                  type="text"
                  className="form-control"
                  name="date"
                  ref={this.date}
                  defaultValue={test.date}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="text"
                  className="form-control"
                  name="time"
                  ref={this.time}
                  defaultValue={test.time}
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
    ) : (
      <Spinner />
    );
  }
}
EditTest.propTypes = {
  test: PropTypes.object,
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "parameters",
      storeAs: "test",
      doc: props.match.params.id
    }
  ]),
  connect(state => ({
    test: state.firestore.ordered.test && state.firestore.ordered.test[0]
  }))
)(withRouter(EditTest));
