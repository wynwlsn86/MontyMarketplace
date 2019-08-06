import React, { Component } from 'react'
import Axios from 'axios';
import { Container, Image } from './common'
import Stock from '../assets/apparel-photo.png'


export default class Contact extends Component {
	constructor(props){
		super()
		this.state = {
			name: null,
			email: null,
			sent: false,
			item: null,
			phoneNumber: null
		}
	}

	inputChange = e => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({[name]: value});
	}
	
	handleFormSubmit = async e => {
		e.preventdefault()
		if(this.state.name && this.state.email && this.state.body){
			let data = {
				name: this.state.name,
				email: this.state.email,
				item: this.state.item,
				phoneNumber: this.state.phoneNumber
			}
			Axios
				// ***************************** not sure about the route
				.post('http://localhost3001/contact', data)
				.then(res=> {
					this.setState({sent: true})
				})
				.catch(e=>{
					console.log(e.message)
				})
		}
	}

	render() {
		return(
			//main container. Outlines??????
			<Container>
				{/* //left container */}
				<Container> 
					<div>
						<h2>Get In Touch</h2>
					</div>
					<Container>
						<form>
							<label>Name:</label>
								<input type='text' name='name' onChange={this.inputChange} />
							<label>Email:</label>
								<input type='text' name='email' onChange={this.inputChange}/>
							<label>Phone Number:</label>
								<input type='text' name='phoneNumber' onChange={this.inputChange}/>
							<lable>Loooking for something special? Let us know!</lable>
								<textarea name='item' onChange={this.inputChange}/>
						</form>
					</Container>
				</Container>
				{/* right container */}
				<Container>
					<Image source={Stock} alt='Stock' />
					<h1>Questions? Ready to buy?</h1>
					<p>Drops us a line.</p>
					<p>We will get back to you as soon as possible with an answer offering the best price</p>
					<p>(242)816-83683</p>
				</Container>
			</Container>
		) 
	}
}
