import React, { Component } from 'react'
import { Container, Card } from './common/index'

import '../styles/AdminContainer.css'
import { AdminChart } from './AdminChart'
export default class AdminDashbord extends Component {
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
						<Card title="Customers" />
						<Card title="Inventory" />
					</Container>
				</Container>
			</div>
		)
	}
}
