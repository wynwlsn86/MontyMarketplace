import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthService from '../services/AuthServices'
import '../styles/SignIn.css'

export default class SignIn extends Component {
  constructor() {
    super()
    this.Service = new AuthService()
    this.state = {
      email: '',
      password: '',
      token: null,
      error: ''
    }
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
    this.setState({ error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { email, password } = this.state
    try {
      const resp = await this.Service.login({ email, password })
      if (resp.status === 200) {
        this.props.setAuthenticated(true)
        this.props.history.push('/admin/dashboard')
      }
    } catch (error) {
      this.setState({ error: 'Invalid Credentials' })
      throw error
    }
  }

  render() {
    const { isAuthenticated } = this.props
    if (isAuthenticated && isAuthenticated === true) {
      return <Redirect to="/admin/dashboard" />
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
              name="email"
              value={this.state.email}
              placeholder="Email"
              type="email"
            />
            <input
              className="password-input"
              name="password"
              value={this.state.password}
              placeholder="Password"
              type="password"
            />
          </div>

          <button type="submit" className="sign-in-button">
            SIGN IN
          </button>
          {this.state.error ? <h4>{this.state.error}</h4> : null}
        </form>
      </div>
    )
  }
}
