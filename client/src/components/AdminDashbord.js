import React, { Component } from 'react'
import { Container, Card } from './common/index'
import { Tabs, Tab } from 'muicss/react'
import { getProducts } from '../services/api'
import '../styles/AdminContainer.css'
import { AdminChart } from './AdminChart'
import AdminManagement from './AdminManagement'
export default class AdminDashbord extends Component {
	constructor(props) {
		super()
		this.state = {
			products: [],
			page: 'inventory'
		}
	}

	async componentDidMount() {}
	onTabChange = (i, value, tab, e) => {
		this.setState({ page: value })
	}

	fecthInventory = async () => {
		const products = await getProducts()
		this.setState({ products })
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
						<Card title="Inventory" className="manage">
							<Tabs justified={true} onChange={this.onTabChange}>
								<Tab value="inventory" label="Inventory" />
								<Tab value="add-inventory" label="Add To Inventory" />
								<Tab value="manage-inventory" label="Manage Inventory" />
							</Tabs>
							<AdminManagement page={this.state.page} />
						</Card>
					</Container>
				</Container>
			</div>
		)
	}
}
