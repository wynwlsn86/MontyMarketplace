import React, { Component } from 'react'
import { Image } from '../components/common'
import { Link } from 'react-router-dom'
import PublicServices from '../services/PublicServices'
import '../styles/ProductPage.css'

export default class Product extends Component {
  constructor(props) {
    super(props)
    this.Service = new PublicServices()
    this.state = {
      product: [],
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
      const product = await this.Service.getProduct(this.state.productId)

      this.setState({ product })
    } else {
      const product = await this.Service.getPhone(this.state.productId)
      this.setState({ product })
    }
  }

  renderApparel = () => {
    const { product } = this.state
    if (product) {
      return (
        <div>
          {/* BACK BUTTON IS STATIC FOR NOW */}
          <div className="back-container">
            <Link to="/marketplace/apparel">
              <button className="back-button">BACK</button>
            </Link>
          </div>
          <div className="product-page-center">
            <div className="product-page-container">
              <div className="product-page-row">
                <div className="product-page-image-column">
                  <div className="product-page-image-container">
                    <Image
                      source={product.imageUrl}
                      alt={product.modelNumber}
                      className="product-page-image"
                    />
                  </div>
                </div>
                <div className="product-page-info-container">
                  <div className="product-page-info-column">
                    <h3 className="product-page-name">{product.name}</h3>
                    <p className="product-page-price">${product.price}</p>
                    <p className="product-page-description">
                      {product.description}
                    </p>
                  </div>
                  {/* DO NOT REMOVE BUTTON CONTAINER DIV, IT CENTERS THE BUTTON AUTOMATICALLY */}
                  <div className="product-page-button-container">
                    <Link to="/contact">
                      <button className="product-page-button">
                        CONTACT US
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  renderPhone = () => {
    console.log(this.state.product)
    const { product } = this.state
    if (product) {
      return (
        <div className="product-page-row">
          <div className="product-page-column">
            <h3>{product.brand}</h3>
            <Image source={product.imageUrl} alt={product.modelNumber} />
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.state.productType === 'apparel'
          ? this.renderApparel()
          : this.renderPhone()}
      </div>
    )
  }
}
