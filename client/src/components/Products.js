import React, { Component } from 'react'
import { getProducts } from '../services/api'
import { Image, Container } from './common'
import JwPagination from 'jw-react-pagination'
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
			// console.log(products)
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
			<JwPagination
				pageSize={this.state.pageSize}
				items={this.state.products}
				onChangePage={this.onChangePage}
			/>
		)
	}

	renderProducts = () => {
		const { pageOfItems } = this.state
		if (pageOfItems) {
			return pageOfItems.map((product) => {
				return (
					<Container>
						<h3
							key={product.id}
							onClick={() =>
								this.props.history.push({
									pathname: `/marketplace/apparel/${product.id}`,
									state: { productId: product.id }
								})
							}>
							{product.name}
						</h3>
						<Image source={product.imageUrl} alt={product.name} />
						<p>${product.price}</p>
					</Container>
				)
			})
		}
	}

	render() {
		return (
			<div>
				Products
				{this.renderProducts()}
				{this.renderPagination()}
			</div>
		)
	}
}
