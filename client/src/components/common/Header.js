import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
// import axios from "axios";
import "./Header.css";

import Home from "../../components/Home";
import About from "../../components/About";
import Apparel from "../../components/Apparel";
import Phones from "../../components/Phones";
import Product from "../Apparel";
import Contact from "../../components/Contact";

import headerLogo from "../../assets/Monty-logo2.png";

export default class Header extends Component {
  render() {
    return (
      <div>
        <div className="header-container">
          <div className="header-logo-container">
            <img src={headerLogo} alt="Monty logo" className="header-logo" />
          </div>
          
            <div className="nav-column-one">
              <li className="nav-one">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-one">
                <Link to="/marketplace">Apparel</Link>
              </li>
              <li className="nav-one">
                <Link to="/marketplace">Phones</Link>
              </li>
            </div>
            <div className="nav-column-two">
              <li className="nav-two">
                <Link to="/about">About</Link>
              </li>
              <li className="nav-two">
                <Link to="/contact">Contact</Link>
              </li>
            </div>
          
        </div>
        <Switch>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route path="/about" render={props => <About {...props} />} />
          <Route path="/marketplace" render={props => <Apparel {...props} />} />
          <Route path="/marketplace" render={props => <Phones {...props} />} />
          <Route
            path="/marketplace/:item_id"
            render={props => <Product {...props} />}
          />
          <Route path="/contact" render={props => <Contact {...props} />} />
        </Switch>
      </div>
    );
  }
}

