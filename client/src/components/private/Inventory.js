import React, { Component } from 'react'
import { Image } from '../common/Image'
import JwPagination from 'jw-react-pagination'
import '../../styles/AllProducts.css'
import PublicServices from '../../services/PublicServices'

export default class Inventory extends Component {
  constructor() {
    super()
    this.Service = new PublicServices()
    this.state = {
      products: [],
      isLoading: false,
      pageOfItems: [],
      pageSize: 10,
      categories: null,
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    this.fetchProducts()
    this.fetchCategories()
  }

  fetchProducts = async () => {
    try {
      const products = await this.Service.getProducts()
      this.setState({ products, isLoading: false })
    } catch (error) {
      throw error
    }
  }

  fetchCategories = async () => {
    try {
      const categories = await this.Service.getCategories()
      this.setState({ categories, isLoading: false })
    } catch (error) {
      throw error
    }
  }

  onChangePage = pageOfItems => {
    this.setState({ pageOfItems: pageOfItems })
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


  renderProducts = () => {
    const { pageOfItems } = this.state
    if (pageOfItems.length) {
      return pageOfItems.map(product => {
        return (
          <div className="products-flex-column" key={product._id}>
            <div
              className="products-container"
              onClick={() =>
                this.props.history.push({
                  pathname: `/admin/update-inventory/apparel/${product._id}`,
                  state: { productId: product._id }
                })
              }
            >
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

  resetAll = () => {
    this.fetchCategories()
    this.fetchProducts()
  }

  render() {
    return (
      <div>
        <div className="products-row">
          <div className="products-column">
            <div className="products-flex-wrap">{this.renderProducts()}</div>
            <div className="pagination-container">
              {this.renderPagination()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
