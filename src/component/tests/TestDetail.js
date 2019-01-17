import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../../component/layout/Spinner";
import { Link } from "react-router-dom";
import moment from "moment";

class TestDetail extends Component {
  state = {
    showUpdateDate: false,
    updateDate: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  dateSubmit = e => {
    e.preventDefault();

    const { firestore, test } = this.props;
    const { updateDate } = this.state;
    const update = {
      date: moment(updateDate).format("L")
    };

    firestore.update({ collection: "parameters", doc: test.id }, update);
  };

  onDeleteClick = () => {
    const { test, firestore, history } = this.props;
    firestore
      .delete({ collection: "parameters", doc: test.id })
      .then(() => history.push("/"));
  };

  render() {
    const { test } = this.props;

    const { showUpdateDate, updateDate } = this.state;
    let dateForm = "";
    if (showUpdateDate) {
      dateForm = (
        <form onSubmit={this.dateSubmit}>
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              name="updateDate"
              placeholder="put a new date"
              value={updateDate}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      dateForm = null;
    }

    if (test) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/test/edit/${test.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="card-header">
                Test date：{test.date}{" "}
                <span>
                  <button
                    onClick={() =>
                      this.setState({
                        showUpdateDate: !this.state.showUpdateDate
                      })
                    }
                    className="btn"
                  >
                    <i className="fas fa-pencil-alt" />
                  </button>
                </span>
              </h3>
              {dateForm}
              <div className="card-body m-auto">
                {test.calcium ? (
                  <div className="row">Calcium: {test.calcium}</div>
                ) : null}
                {test.alkalinity ? (
                  <div className="row">Alkalinity: {test.alkalinity}</div>
                ) : null}
                {test.phosphate ? (
                  <div className="row">Phosphate: {test.phosphate}</div>
                ) : null}
                {test.nitrate ? (
                  <div className="row">Nitrate: {test.nitrate}</div>
                ) : null}
                {test.ph ? <div className="row">PH: {test.ph}</div> : null}
                {test.event ? (
                  <div className="row">Event: {test.event}</div>
                ) : null}
                {test.time ? (
                  <div className="row">Time: {test.time}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

TestDetail.propTypes = {
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
)(withRouter(TestDetail));
