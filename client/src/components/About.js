import React, { Component } from "react";
import "../styles/About.css";

import aboutPhoto from '../assets/about-photo.png';

export default class About extends Component {
  render() {
    return (
		<div className="about-center">
      <div className="about-container">
        <div className="about-row">
          <div className="about-column-one">
            <h2 className="about-header">Native Bahamian - Natural Entrepreneur</h2> 
			<br />
			<p className="about-para">Born and raised on the
            islands with my family,<br /> helping people find a solution to a less
            expensive way, discounted, on the most recent products. 
			<br /><br />
			We offer
            many types, styles, and conditions<br /> to meet everyone’s needs for
            different affordable prices.</p></div>
            <div className="about-column-two" />
			<img src={aboutPhoto} className="about-photo" alt="logo"/>
          </div>
        </div>
      </div>
    );
  }
}
