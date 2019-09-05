import React, { Component } from 'react'
import {
	getProducts,
	getCategories,
	getProductsByCategory
} from '../services/api'
import { Image } from './common'
import Filter from './Filter'
import JwPagination from 'jw-react-pagination'

import '../styles/AllProducts.css'

export default class Products extends Component {
	constructor() {
		super()
		this.state = {
			products: [],
			isLoading: false,
			pageOfItems: [],
			pageSize: 10,
			categories: null,
			filterValues: []
		}
	}
	async componentDidMount() {
		this.setState({ isLoading: true })
		await this.fetchProducts()
		await this.fetchCategories()
	}

	fetchProducts = async () => {
		try {
			const products = await getProducts()
			this.setState({ products, isLoading: false })
		} catch (error) {
			throw error
		}
	}

	fetchCategories = async () => {
		try {
			const categories = await getCategories()
			this.setState({ categories, isLoading: false })
		} catch (error) {
			throw error
		}
	}

	renderFilteredProducts = async () => {
		const data = await getProductsByCategory(this.state.filterValues)
		this.setState({ products: data })
	}

	addToFilter = (item) => {
		// console.log(item)
		const { filterValues } = this.state
		if (filterValues.length === 0)
			this.setState({ filterValues: [...filterValues, item] })
		else {
			return filterValues.filter((category) => {
				if (category.attire !== item.attire) {
					this.setState({ filterValues: [...filterValues, item] })
				} else {
					filterValues.splice(filterValues.indexOf(category), 1)
					this.setState({ filterValues: [...filterValues] })
				}
			})
		}
	}

	onChangePage = (pageOfItems) => {
		this.setState({ pageOfItems: pageOfItems })
	}

	renderFilteredProducts = async () => {
		const data = await getProductsByCategory(this.state.filterValues)
		this.setState({ products: data })
	}

	renderPagination = () => {
		if (this.state.products) {
			return (
				<JwPagination
					pageSize={this.state.pageSize}
					items={this.state.products}
					onChangePage={this.onChangePage}
				/>
			)
		}
	}

	addToFilter = (item) => {
		const { filterValues } = this.state
		if (filterValues.length === 0)
			this.setState({ filterValues: [...filterValues, item] })
		else {
			return filterValues.filter((category) => {
				if (category.attire !== item.attire) {
					this.setState({ filterValues: [...filterValues, item] })
				} else {
					filterValues.splice(filterValues.indexOf(category), 1)
					this.setState({ filterValues: [...filterValues] })
				}
			})
		}
	}

	renderProducts = () => {
		const { pageOfItems } = this.state
		if (pageOfItems) {
			console.log(pageOfItems)
			return pageOfItems.map((product) => {
				return (
					<div className="products-flex-column" key={product._id}>
						<div
							className="products-container"
							onClick={() =>
								this.props.history.push({
									pathname: `/marketplace/apparel/${product._id}`,
									state: { productId: product._id }
								})
							}>
							<div className="products-image-container">
								<Image
									source={product.imageUrl}
									alt={product.name}
									className="product-images"
								/>
							</div>
							<h3 className="products-name">{product.name}</h3>
							<p className="products-price">${product.price}</p>
						</div>
					</div>
				)
			})
		}
	}

	filterProducts = () => {}

	render() {
		return (
			<div>
				<div className="products-row">
					<div className="products-filter-column">
						<Filter
							addToFilter={this.addToFilter}
							categories={this.state.categories}
							renderFilteredProducts={this.renderFilteredProducts}
							fetchProducts={this.fetchProducts}
						/>
					</div>
					<div className="products-column">
						<div className="products-flex-wrap">{this.renderProducts()}</div>
						<div className="pagination-container">
							{this.renderPagination()}
							{/* {this.renderFilteredProducts()} */}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
