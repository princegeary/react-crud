import React, { Component } from 'react';
import './App.css';

import Contacts from './containers/Contacts';
import ViewContact from '../src/components/ViewContact';
import PageNotFound from '../src/components/PageNotFound';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Contacts}></Route>
            <Route exact path="/view/:id/:name/:email/:phone" name="view" component={ViewContact}></Route>
            <Route name="pagenotfound" component={PageNotFound}></Route>
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
