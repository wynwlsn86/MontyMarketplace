import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { login } from '../services/api'

export default class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			token: null,
			error: ''
		}
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
		this.setState({ error: '' })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const { username, password } = this.state
		try {
			const signIn = await login({ username, password })
			console.log(signIn)
			this.setState({ token: signIn.token })
		} catch (error) {
			this.setState({ error: 'Invalid Credentials' })
			throw error
		}
	}

	render() {
		if (this.state.token) {
			return <Redirect to="/admin/dashboard" />
		}
		return (
			<div className="sign-in">
				<form onChange={this.handleChange} onSubmit={this.handleSubmit}>
					<input
						name="username"
						value={this.state.username}
						placeholder="Username"
					/>
					<input
						name="password"
						value={this.state.password}
						placeholder="Password"
					/>
					<button type="submit">Sign In</button>
				</form>
			</div>
		)
	}
}
