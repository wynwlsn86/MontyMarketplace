import React, { Component } from 'react'
import { getProducts } from '../services/api'

export default class Products extends Component {
	constructor() {
		super()
		this.state = {
			products: [],
			isLoading: false
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

	renderProducts = () => {
		const { products } = this.state
		if (products) {
			return products.map((product) => {
				return (
					<h3
						key={product.id}
						onClick={() =>
							this.props.history.push({
								pathname: `/marketplace/${product.id}`,
								state: { productId: product.id }
							})
						}>
						{product.name}
					</h3>
				)
			})
		}
	}

	render() {
		return (
			<div>
				Products
				{this.renderProducts()}
			</div>
		)
	}
}
