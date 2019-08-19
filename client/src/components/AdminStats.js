import React, { Component } from 'react'
import { AdminChart } from './AdminChart'
import { Card, Grid, Cell } from 'react-md'
export default class AdminStats extends Component {
	render() {
		return (
			<Grid gutter={12}>
				<Cell className="md-cell--4">
					<Card>
						<AdminChart orders={this.props.orders} />
					</Card>
				</Cell>
				<Cell className="md-cell--4">
					<Card>
						<AdminChart orders={this.props.orders} />
					</Card>
				</Cell>
			</Grid>
		)
	}
}
