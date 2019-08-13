import React, { Component } from "react";
import { getProduct, getPhone } from "../services/api";
import { Image } from "./common";

import "../styles/ProductPage.css";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      productId: props.location.state.productId,
      productType: props.match.params.product_type,
      isLoading: false
    };
  }
  async componentDidMount() {
    await this.fetchProduct();
  }

  fetchProduct = async () => {
    if (this.state.productType === "apparel") {
      const product = await getProduct(this.state.productId);

      this.setState({ product });
    } else {
      const product = await getPhone(this.state.productId);
      this.setState({ product });
    }
  };

  renderApparel = () => {
    console.log(this.state.product);
    const { product } = this.state;
    if (product) {
      return (
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
                <div className="product-page-info-container">
                  <div className="product-page-info-column">
                    <h3 className="product-page-name">{product.name}</h3>
                    <p className="product-page-price">${product.price}</p>
                    <p className="product-page-description">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  renderPhone = () => {
    console.log(this.state.product);
    const { product } = this.state;
    if (product) {
      return (
        <div className="product-page-row">
          <div className="product-page-column">
            <h3>{product.brand}</h3>
            <Image source={product.imageUrl} alt={product.modelNumber} />
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this.state.productType === "apparel"
          ? this.renderApparel()
          : this.renderPhone()}
      </div>
    );
  }
}
