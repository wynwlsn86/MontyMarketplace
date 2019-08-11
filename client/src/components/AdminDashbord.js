import React, { Component } from 'react'
import { Container, Card } from './common/index'
import { Tabs, Tab, Divider } from 'muicss/react'
import { getInventory } from '../services/api'
import '../styles/AdminContainer.css'
import { AdminChart } from './AdminChart'
import AdminManagement from './AdminManagement'
export default class AdminDashbord extends Component {
	constructor() {
		super()
		this.state = {
			inventory: [],
			isLoading: false,
			page: 'inventory'
		}
	}

	async componentDidMount() {
		this.setState({ isLoading: true })
		await this.fecthInventory()
	}
	onTabChange = (i, value, tab, e) => {
		this.setState({ page: value })
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
								className="tab-header"
								onChange={this.onTabChange}>
								<Tab value="inventory" label="Inventory" />
								<Tab value="add-inventory" label="Add To Inventory" />
								<Tab value="manage-inventory" label="Manage Inventory" />
							</Tabs>
							<AdminManagement
								page={this.state.page}
								inventory={this.state.inventory}
								isLoading={this.state.isLoading}
							/>
						</Card>
					</Container>
				</Container>
			</div>
		)
	}
}
