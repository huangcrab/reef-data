import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../../component/layout/Spinner";
import moment from "moment";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class WaterTests extends Component {
  state = {
    calcium: [],
    avgCa: ""
  };
  onDotClick = e => {
    this.props.history.push(`/test/${e.payload.id}`);
  };

  tickFormatter = tick => moment(tick * 1000).format("L");
  static getDerivedStateFromProps(props) {
    const { tests } = props;

    if (tests) {
      tests.forEach(test => {
        Object.keys(test).forEach(key => {
          if (test[key] === "") {
            delete test[key];
          }
        });
      });
      tests.sort(
        (a, b) =>
          new Date(a.date).getTime() / 1000 - new Date(b.date).getTime() / 1000
      );
    }

    return null;
  }
  render() {
    const waterTests = this.props.tests;
    const { avgCa } = this.state;
    if (waterTests) {
      return (
        <div>
          <div className="row mb-3">
            <div className="col-md-6">
              <i className="fas fa-vial" /> Water Parameters
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                {" "}
                Total Tests:{" "}
                <span className="text-primary">{waterTests.length}</span>
              </h5>
              <h5 className="text-right text-secondary">
                {" "}
                Average Ca level:
                <span className="text-primary">{avgCa}</span>
              </h5>
            </div>
          </div>
          <div className="row">
            <ResponsiveContainer width="100%" aspect={4.0 / 1}>
              <LineChart className="chart" data={waterTests} syncId="anyId">
                <Line
                  type="monotone"
                  dataKey="ph"
                  stroke="green"
                  activeDot={{ r: 6, onClick: this.onDotClick.bind(this) }}
                />
                <Line
                  type="monotone"
                  dataKey="alkalinity"
                  stroke="#8884d8"
                  activeDot={{ r: 6, onClick: this.onDotClick.bind(this) }}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" interval={5} />
                <YAxis />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" aspect={4.0 / 1}>
              <LineChart className="chart" data={waterTests} syncId="anyId">
                <Line
                  type="monotone"
                  dataKey="calcium"
                  stroke="#8884d8"
                  activeDot={{ r: 6, onClick: this.onDotClick.bind(this) }}
                />

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis domain={[350, 450]} />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" aspect={4.0 / 1}>
              <LineChart className="chart" data={waterTests} syncId="anyId">
                <Line
                  type="monotone"
                  dataKey="phosphate"
                  stroke="#8884d8"
                  activeDot={{ r: 6, onClick: this.onDotClick.bind(this) }}
                />

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" aspect={4.0 / 1}>
              <LineChart className="chart" data={waterTests} syncId="anyId">
                <Line
                  type="monotone"
                  dataKey="nitrate"
                  stroke="#8884d8"
                  activeDot={{ r: 6, onClick: this.onDotClick.bind(this) }}
                />

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

WaterTests.propTypes = {
  tests: PropTypes.array,
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect([{ collection: "parameters" }]),
  connect(state => ({
    tests: state.firestore.ordered.parameters
  }))
)(withRouter(WaterTests));
