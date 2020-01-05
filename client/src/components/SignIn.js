import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../services/api";
import "../styles/SignIn.css";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: null,
      error: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ error: "" });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    try {
      const signIn = await login({ username, password });
      this.setState({ token: signIn.token });
    } catch (error) {
      this.setState({ error: "Invalid Credentials" });
      throw error;
    }
  };

  render() {
    if (this.state.token) {
      return <Redirect to="/admin/dashboard" />;
    }
    return (
      <div className="sign-in-container">
        <form
          className="sign-in-form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <div className="sign-in-input-container">
            <input
              className="username-input"
              name="username"
              value={this.state.username}
              placeholder="Username"
            />
            <input
              className="password-input"
              name="password"
              value={this.state.password}
              placeholder="Password"
            />
          </div>
          
            <button type="submit" className="sign-in-button">
              SIGN IN
            </button>
            {this.state.error ? <h4>{this.state.error}</h4> : null}
        </form>
      </div>
    );
  }
}
