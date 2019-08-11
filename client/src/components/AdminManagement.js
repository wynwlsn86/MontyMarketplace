import React, { Component } from 'react'
import { Form, FormInput } from './common'
import { Button } from 'muicss/react'

export default class AdminManagement extends Component {
	constructor() {
		super()
		this.state = {
			products: [],
			itemName: '',
			brand: '',
			imageUrl: '',
			description: '',
			clearance: ''
		}
	}

	async componentDidMount() {}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { itemName, brand, imageUrl, description, clearance } = this.state
		const data = {
			itemName: itemName,
			brand: brand,
			imageUrl: imageUrl,
			description: description,
			clearance: clearance === 'yes' ? true : false
		}
	}

	render() {
		const { itemName, brand, imageUrl, description, clearance } = this.state
		switch (this.props.page) {
			case 'inventory':
				return <h3>Inventory</h3>
			case 'add-inventory':
				return (
					<Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
						<FormInput label="Item Name" name="itemName" value={itemName} />
						<FormInput label="Brand" name="brand" value={brand} />
						<FormInput
							label="Item Image Url"
							name="imageUrl"
							value={imageUrl}
						/>
						<FormInput
							label="Description"
							name="description"
							value={description}
						/>
						<FormInput
							label="Clearance ex: Yes or No"
							name="clearance"
							value={clearance}
						/>
						<Button type="submit" variant="raised" color="primary">
							Submit
						</Button>
					</Form>
				)
			case 'manage-inventory':
				return <h3>Page3</h3>
			default:
				return <h3>default</h3>
		}
	}
}
