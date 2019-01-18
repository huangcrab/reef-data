import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../../component/layout/Spinner";
import moment from "moment";
import Sidebar from "../layout/Sidebar";
import Chart from "../../component/utils/Chart";

import { Line } from "recharts";

class WaterTests extends Component {
  state = {
    calcium: [],
    avgCal: "",
    showTooltip: false,
    tooltip: {}
  };
  onDotClick = e => {
    this.props.history.push(`/test/${e.payload.id}`);
  };

  onDotOver = e => {
    this.setState({ showTooltip: true });
    this.setState({ tooltip: e.payload });
  };

  onDotOut = () => {
    this.setState({ showTooltip: false });
    this.setState({ tooltip: {} });
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

      const cals = tests
        .filter(test => test.calcium)
        .map(test => parseInt(test.calcium));

      let sum = cals.reduce((acc, cal) => acc + cal, 0);

      return { avgCal: (sum / cals.length).toFixed(2).toString() };
    }

    return null;
  }
  render() {
    const waterTests = this.props.tests;
    const { showTooltip, tooltip, avgCal } = this.state;
    const activeDot = {
      r: 8,
      onClick: this.onDotClick,
      onMouseOver: this.onDotOver,
      onMouseOut: this.onDotOut
    };

    if (waterTests) {
      return (
        <div className="row">
          <div className="col-md-10">
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
                  <span className="text-primary"> {avgCal}</span>
                </h5>
              </div>
            </div>
            <div className="row">
              <Chart data={waterTests} dataKey="date" domainY={[6, 12]}>
                <Line
                  strokeWidth={2}
                  legendType="triangle"
                  name="PH"
                  dot={false}
                  type="monotone"
                  connectNulls={true}
                  dataKey="ph"
                  stroke="#00e64d"
                  activeDot={activeDot}
                />

                <Line
                  strokeWidth={2}
                  legendType="triangle"
                  name="Alkalinity"
                  dot={false}
                  connectNulls={true}
                  type="monotone"
                  dataKey="alkalinity"
                  stroke="#0000e6"
                  activeDot={activeDot}
                />
              </Chart>

              <Chart data={waterTests} dataKey="date" domainY={[350, 450]}>
                <Line
                  strokeWidth={2}
                  legendType="triangle"
                  name="Calcium"
                  dot={false}
                  type="monotone"
                  dataKey="calcium"
                  connectNulls={true}
                  stroke="#e600e6"
                  activeDot={activeDot}
                />
              </Chart>
              <Chart data={waterTests} dataKey="date">
                <Line
                  strokeWidth={2}
                  legendType="triangle"
                  name="Phosphate"
                  dot={false}
                  connectNulls={true}
                  type="monotone"
                  dataKey="phosphate"
                  stroke="#e60000"
                  activeDot={activeDot}
                />
              </Chart>

              <Chart data={waterTests} dataKey="date">
                <Line
                  strokeWidth={2}
                  legendType="triangle"
                  name="Nitrate"
                  dot={false}
                  connectNulls={true}
                  type="monotone"
                  dataKey="nitrate"
                  stroke="#ff5c33"
                  activeDot={activeDot}
                />
              </Chart>
            </div>
          </div>
          <div className="col-md-2">
            <Sidebar />
            <hr />
            {showTooltip ? (
              <div className="card">
                <div className="card-header">Highlighted Test</div>
                <div className="card-body m-auto">
                  {tooltip.date ? (
                    <div className="row">Test Date: {tooltip.date}</div>
                  ) : null}
                  <hr />
                  {tooltip.calcium ? (
                    <div className="row">Calcium: {tooltip.calcium}</div>
                  ) : null}
                  {tooltip.alkalinity ? (
                    <div className="row">Alkalinity: {tooltip.alkalinity}</div>
                  ) : null}
                  {tooltip.phosphate ? (
                    <div className="row">Phosphate: {tooltip.phosphate}</div>
                  ) : null}
                  {tooltip.nitrate ? (
                    <div className="row">Nitrate: {tooltip.nitrate}</div>
                  ) : null}
                  {tooltip.ph ? (
                    <div className="row">PH: {tooltip.ph}</div>
                  ) : null}
                  {tooltip.event ? (
                    <div className="row">Event: {tooltip.event}</div>
                  ) : null}
                  {tooltip.time ? (
                    <div className="row">Time: {tooltip.time}</div>
                  ) : null}
                </div>
              </div>
            ) : null}
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
