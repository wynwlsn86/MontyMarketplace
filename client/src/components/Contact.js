import React, { Component } from "react";
import Axios from "axios";

import "../styles/Contact.css";
import contactPhoto from "../assets/contact-photo.png";

export default class Contact extends Component {
  constructor(props) {
    super();
    this.state = {
      name: null,
      email: null,
      body: null,
      sent: false,
      item: false
    };
  }
  inputChange = e => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async e => {
    e.preventdefault();
    if (this.state.name && this.state.email && this.state.body) {
      let data = {
        name: this.state.name,
        email: this.state.email,
        body: this.state.body
      };
      Axios
        // ***************************** not sure about the route
        .post("http://localhost3001/contact", data)
        .then(res => {
          this.setState({ sent: true });
        })
        .catch(e => {
          console.log(e.message);
        });
    }
  };

  render() {
    return (
      <div className="contact-center">
        <div className="contact-container">
          <div className="contact-row">
            <div className="contact-column-one">
              <div className="contact-form-container">
                <h2 className="contact-form-header">Get In Touch</h2>

                <form>
                  <label>Name</label>
                  <div className="contact-form-name-container">
                    <input
                      type="text"
                      name="name"
                      onChange={this.inputChange}
                    />
                  </div>

                  <label>Email</label>
                  <div className="contact-form-email-container">
                    <input
                      type="text"
                      name="email"
                      onChange={this.inputChange}
                    />
                  </div>
                  <label>Looking for something special? Let us know!</label>
                  <textarea name="body" onChange={this.inputChange} />
                  <div className="contact-button-container">
                    <button className="contact-button">SEND</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="contact-column-two">
              <img src={contactPhoto} className="contact-photo" alt="Stock" />
              <h1 className="contact-column-two-header">
                Questions? Ready to buy?
              </h1>
			  <div className="contact-para-container">
              <p className="contact-para">Drops us a line.</p>
              <p className="contact-para">
                We will get back to you as soon as possible with an answer
                offering the best price.
              </p>
              <p className="contact-para">(242)816-83683</p>
            </div>
			</div>
          </div>
        </div>
      </div>
    );
  }
}
