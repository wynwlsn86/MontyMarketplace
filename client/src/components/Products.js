import React, { Component } from 'react'
import { getProducts } from '../services/api'
import { Image } from './common'
import JwPagination from 'jw-react-pagination'

import '../styles/Products.css'

export default class Products extends Component {
	constructor() {
		super()
		this.state = {
			products: [],
			isLoading: false,
			pageOfItems: [],
			pageSize: 10
		}
	}
	async componentDidMount() {
		this.setState({ isLoading: true })
		await this.fetchProducts()
	}

	fetchProducts = async () => {
		try {
			const products = await getProducts()
			this.setState({ products, isLoading: false })
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
		await this.fetchProducts()
	}

	renderPagination = () => {
		return (
			<div className="pagination">
				<JwPagination
					pageSize={this.state.pageSize}
					items={this.state.products}
					onChangePage={this.onChangePage}
				/>
			</div>
		)
	}

	renderProducts = () => {
		const { pageOfItems } = this.state
		if (pageOfItems) {
			return pageOfItems.map((product) => {
				console.log(product)
				return (
					<div className="products-flex-column">
						<div className="products-container">
							<h3
								className="products-name"
								key={product._id}
								onClick={() =>
									this.props.history.push({
										pathname: `/marketplace/apparel/${product._id}`,
										state: { productId: product._id }
									})
								}>
								{product.name}
							</h3>
							<Image source={product.imageUrl} alt={product.name} />
							<p className="products-price">${product.price}</p>
						</div>
					</div>
				)
			})
		}
	}

	render() {
		return (
			<div>
				<div className="products-row">
					<div className="products-filter-column">
						<p className="products-filter">This is the filter</p>
					</div>
					<div className="products-column">
						<div className="products-flex-wrap">{this.renderProducts()}</div>
					</div>
				</div>
				<div className="pagination-container">{this.renderPagination()}</div>
			</div>
		)
	}
}
