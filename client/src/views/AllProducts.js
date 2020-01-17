import React, { Component } from 'react'
import { Image } from '../components/common'
import Filter from '../components/Filter'
import JwPagination from 'jw-react-pagination'
import '../styles/AllProducts.css'
import PublicServices from '../services/PublicServices'

export default class Products extends Component {
  constructor() {
    super()
    this.Service = new PublicServices()
    this.state = {
      products: [],
      isLoading: false,
      pageOfItems: [],
      pageSize: 10,
      categories: null,
      filterValues: []
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

  renderFilteredProducts = async () => {
    const data = await this.Service.getProductsByCategory(
      this.state.filterValues
    )
    this.setState({ products: data })
  }

  addToFilter = (indeces, id) => {
    this.setState(state => {
      const itemsToggle =
        state.categories[indeces.index].subCategories[indeces.subIndex]
      itemsToggle.isChecked = !itemsToggle.isChecked
      if (state.filterValues.includes(id)) {
        const filterValues = this.state.filterValues
        filterValues.splice(filterValues.indexOf(id), 1)
      } else {
        state.filterValues = [...state.filterValues, id]
      }
      return state
    })
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

  applyFilter = async () => {
    if (this.state.filterValues.length) {
      const products = await this.Service.getProductsByCategory(
        this.state.filterValues
      )
      this.setState({ products })
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
                  pathname: `/marketplace/apparel/${product._id}`,
                  state: { productId: product._id }
                })
              }
            >
              <div className="products-image-container">
                <Image
                  source={product.imageUrl[0]}
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
    this.setState({ filterValues: [] })
  }

  render() {
    return (
      <div>
        <div className="products-row">
          <div className="products-filter-column">
            <Filter
              addToFilter={this.addToFilter}
              categories={this.state.categories}
              applyFilter={this.applyFilter}
              resetAll={this.resetAll}
              disableApply={!this.state.filterValues.length}
            />
          </div>
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
