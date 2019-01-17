import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./component/layout/Navbar";
import Dashboard from "./component/layout/Dashboard";

import AddTest from "./component/tests/AddTest";
import EditTest from "./component/tests/EditTest";
import TestResult from "./component/tests/TestDetail";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/test/add" component={AddTest} />
                <Route exact path="/test/:id" component={TestResult} />
                <Route exact path="/test/edit/:id" component={EditTest} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
