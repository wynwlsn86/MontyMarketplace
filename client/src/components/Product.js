import React, { Component } from 'react'
import { getProduct, getPhone } from '../services/api'
import { Container, Image } from './common'

export default class Product extends Component {
	constructor(props) {
		super(props)
		this.state = {
			products: [],
			productId: props.location.state.productId,
			productType: props.match.params.product_type,
			isLoading: false
		}
	}
	async componentDidMount() {
		await this.fetchProduct()
	}

	fetchProduct = async () => {
		if (this.state.productType === 'apparel') {
			const product = await getProduct(this.state.productId)
			this.setState({ product })
		} else {
			const product = await getPhone(this.state.productId)
			this.setState({ product })
		}
	}

	renderApparel = () => {
		const { product } = this.state
		if (product) {
			return (
				<Container classname="products">
					<h3>{product.name}</h3>
					<p>${product.price}</p>
					<p>{product.description}</p>
				</Container>
			)
		}
	}

	renderPhone = () => {
		console.log(this.state.product)
		const { product } = this.state
		if (product) {
			return (
				<Container>
					<h3>{product.brand}</h3>
					<Image source={product.imageUrl} alt={product.modelNumber} />
				</Container>
			)
		}
	}

	render() {
		return (
			<Container classname="product-continer">
				Product
				<Container classname="filter-container">Filter</Container>
				{this.state.productType === 'apparel'
					? this.renderApparel()
					: this.renderPhone()}
			</Container>
		)
	}
}
