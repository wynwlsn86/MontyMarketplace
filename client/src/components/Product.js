import React, { Component } from "react";
import { getProduct, getPhone } from "../services/api";
import { Container, Image } from "./common";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
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
    const { product } = this.state;
    if (product) {
      return (
        <div>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <p>{product.description}</p>
        </div>
      );
    }
  };

  renderPhone = () => {
    console.log(this.state.product);
    const { product } = this.state;
    if (product) {
      return (
        <div>
          <h3>{product.brand}</h3>
          <Image source={product.imageUrl} alt={product.modelNumber} />
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        Product
        {this.state.productType === "apparel"
          ? this.renderApparel()
          : this.renderPhone()}
      </div>
    );
  }
}
