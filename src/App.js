import React, { Component } from 'react';
import './App.css';
import ContactUs from './components/contact-us'
import Home from './components/home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-light bg-dark border-bottom">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link text-white">Home</Link>
            </li>
            <li className="nav-item active">
              <Link to="/contact-us" className="nav-link text-white">Contact Us</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/contact-us">
            <ContactUs />
          </Route>
        </Switch>
      </Router>

    );
  }
}

export default App;