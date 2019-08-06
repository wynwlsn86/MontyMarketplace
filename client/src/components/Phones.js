import React, { Component } from 'react'
import JwPagination from 'jw-react-pagination'
import { getPhones } from '../services/api'

export default class Phones extends Component {
	constructor() {
		super()
		this.state = {
			phones: [],
			pageOfItems: []
		}
	}

	async componentDidMount() {
		await this.fetchPhones()
	}

	fetchPhones = async () => {
		try {
			const phones = await getPhones()
			this.setState({ phones })
		} catch (error) {
			throw error
		}
	}

	onChangePage = (pageOfItems) => {
		this.setState({ pageOfItems: pageOfItems })
	}

	renderPhones = () => {
		return this.state.pageOfItems.map((item) => {
			return (
				<ul>
					<button
						key={item.id}
						onClick={() =>
							this.props.history.push({
								pathname: `/marketplace/phones/${item.id}`,
								state: { productId: item.id }
							})
						}>
						{item.modelNumber}
					</button>
				</ul>
			)
		})
	}

	render() {
		return (
			<div>
				Phones
				{this.renderPhones()}
				<JwPagination
					items={this.state.phones}
					onChangePage={this.onChangePage}
				/>
			</div>
		)
	}
}
