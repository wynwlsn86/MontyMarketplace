import React, { Component } from 'react'
import { Container, Card } from './common/index'
import { Tabs, Tab } from 'muicss/react'
import { getInventory } from '../services/api'
import '../styles/AdminContainer.css'
import { AdminChart } from './AdminChart'
import AdminManagement from './AdminManagement'
export default class AdminDashbord extends Component {
	constructor() {
		super()
		this.state = {
			inventory: [],
			page: 1,
			selectedItem: null,
			isLoading: false
		}
	}

	async componentDidMount() {
		await this.setState({ isLoading: true, selectedItem: null })
		await this.fecthInventory()
	}

	onTabChange = (i) => {
		if (i + 1 !== 3) {
			this.setState({ page: i + 1, selectedItem: null })
		} else {
			this.setState({ page: i + 1 })
		}
	}

	setSelectedItem = (item) => {
		this.setState({ selectedItem: item })
		this.onTabChange(2)
	}

	fecthInventory = async () => {
		const inventory = await getInventory()
		this.setState({ inventory, isLoading: false })
	}

	render() {
		return (
			<div className="admin">
				<Container classname="admin-container">
					<Container classname="admin-top-container">
						<Card title="Total Orders" />
						<Card title="Profit" />
						<Card title="Orders">
							<AdminChart />
						</Card>
					</Container>
					<Container classname="admin-bottom-container">
						<Card title="Customers" className="customers" />
						<Card className="manage">
							<Tabs
								justified={true}
								selectedIndex={this.state.page - 1}
								className="tab-header"
								onChange={this.onTabChange}>
								<Tab value="inventory" label="Inventory" />
								<Tab value="add-inventory" label="Add To Inventory" />
								<Tab value="manage-inventory" label="Manage Inventory" />
							</Tabs>
							<AdminManagement
								page={this.state.page}
								setSelectedItem={this.setSelectedItem}
								onTabChange={this.onTabChange}
								inventory={this.state.inventory}
								isLoading={this.state.isLoading}
								selectedItem={this.state.selectedItem}
							/>
						</Card>
					</Container>
				</Container>
			</div>
		)
	}
}
