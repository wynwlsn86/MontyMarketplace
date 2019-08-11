import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import AdminForm from './AdminForm'
import InventoryList from './InventoryList'
export default class AdminManagement extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inventory: [],
			selectItem: {}
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			inventory: props.inventory
		})
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
		}
	}

	render() {
		switch (this.props.page) {
			case 1:
				return this.state.inventory.length ? (
					<InventoryList
						inventory={this.state.inventory}
						renderInventory={this.renderInventory}
						handleSort={this.handleSort}
					/>
				) : (
					<Loader type="Triangle" color="#00BFFF" height={100} width={100} />
				)
			case 2:
				return <AdminForm />

			case 3:
				return <h3>Page3</h3>
			default:
				return <h3>default</h3>
		}
	}
}
