import React, { Component } from 'react'
import { Form, FormInput } from './common'
import { Button, Divider, Tabs, Tab } from 'muicss/react'
import Loader from 'react-loader-spinner'
export default class AdminManagement extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inventory: [],
			selectItem: {},
			sortValue: '',
			itemName: '',
			brand: '',
			imageUrl: '',
			description: '',
			clearance: ''
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			inventory: props.inventory
		})
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSort = (value) => {
		const sortedInventory = this.state.inventory.sort((a, b) => {
			if (a[`${value}`] > b[`${value}`] && value === 'quantity') {
				return -1
			}
			if (a[`${value}`] < b[`${value}`]) {
				return -1
			}
			if (a[`${value}`] > b[`${value}`]) {
				return 1
			}

			return a[`${value}`] - b[`${value}`]
		})
		this.setState({ inventory: sortedInventory })
	}

	renderInventory = () => {
		if (this.state.inventory.length) {
			return this.state.inventory.map((item) => {
				return (
					<div className="inventory-item" key={item.id}>
						<h3>{item.name}</h3>
						<h3>{item.brand}</h3>
						<h3>{item.quantity}</h3>
					</div>
				)
			})
		} else {
			return <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
		}
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
				return (
					<div className="inventory-item-container">
						<Tabs
							className="inventory-header"
							justified={true}
							onChange={(i, value, tab) => this.handleSort(value)}>
							<Tab value="name" label="Name" />
							<Tab value="brand" label="Brand" />
							<Tab value="quantity" label="Quantity" />
						</Tabs>
						<Divider />
						{this.renderInventory()}
					</div>
				)
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
