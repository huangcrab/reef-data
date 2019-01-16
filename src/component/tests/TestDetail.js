import React, { Component } from "react";

export default class TestDetail extends Component {
  render() {
    return <div>{this.props.match.params.id}</div>;
  }
}
