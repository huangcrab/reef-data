import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

import Navbar from './component/layout/Navbar';
import Dashboard from './component/layout/Dashboard';
import Login from './component/auth/Login';
import AddTest from './component/tests/AddTest';
import EditTest from './component/tests/EditTest';
import TestResult from './component/tests/TestDetail';
import Settings from './component/user/Settings';
import Register from './component/auth/Register';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

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
                <Route
                  exact
                  path="/test/add"
                  component={UserIsAuthenticated(AddTest)}
                />
                <Route
                  exact
                  path="/test/:id"
                  component={UserIsAuthenticated(TestResult)}
                />
                <Route
                  exact
                  path="/test/edit/:id"
                  component={UserIsAuthenticated(EditTest)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
                <Route
                  exact
                  path="/settings"
                  component={UserIsAuthenticated(Settings)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
