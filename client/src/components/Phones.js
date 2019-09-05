import React, { Component } from 'react'
import JwPagination from 'jw-react-pagination'
import { getPhones } from '../services/api'
import { Image } from './common'

export default class Phones extends Component {
	constructor() {
		super()
		this.state = {
			phones: [],
			pageOfItems: [],
			pageSize: 10
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

	onChangePageSize = async (e) => {
		const { value } = e.target
		this.setState({ pageSize: parseInt(value) })
		await this.fetchPhones()
	}

	renderPhones = () => {
		if (this.state.phones.length) {
			return this.state.pageOfItems.map((item) => {
				return (
					<div key={item._id}>
						<button
							onClick={() =>
								this.props.history.push({
									pathname: `/marketplace/phones/${item.id}`,
									state: { productId: item.id }
								})
							}>
							{item.modelNumber}
						</button>
						<div>
							<Image
								source={item.imageUrl ? item.imageUrl.imageUrl : null}
								alt={item.model}
								className="product-images"
							/>
						</div>
					</div>
				)
			})
		}
	}

	renderPagination = () => {
		return (
			<JwPagination
				pageSize={this.state.pageSize}
				items={this.state.phones}
				onChangePage={this.onChangePage}
			/>
		)
	}

	render() {
		return (
			<div>
				Phones
				<select onChange={this.onChangePageSize}>
					<option name="pageSize" value={10}>
						10
					</option>
					<option name="pageSize" value={20}>
						20
					</option>
					<option name="pageSize" value={30}>
						30
					</option>
					<option name="pageSize" value={40}>
						40
					</option>
					<option name="pageSize" value={50}>
						50
					</option>
				</select>
				{this.renderPhones()}
				{this.renderPagination()}
			</div>
		)
	}
}
