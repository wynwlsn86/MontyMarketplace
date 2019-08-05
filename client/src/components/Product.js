import React, { Component } from 'react'
import { getProduct } from '../services/api'

export default class Product extends Component {
	constructor(props) {
		super(props)
		this.state = {
			product: {},
			productId: props.location.state.productId,
			isLoading: false
		}
	}
	async componentDidMount() {
		await this.fetchProduct()
	}

	fetchProduct = async () => {
		const product = await getProduct(this.state.productId)
		console.log(product)
		this.setState({ product })
	}

	renderProduct = () => {
		const { product } = this.state
		if (product) {
			return (
				<div>
					<h3>{product.name}</h3>
					<p>${product.price}</p>
					<p>{product.description}</p>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				Product
				{this.renderProduct()}
			</div>
		)
	}
}
