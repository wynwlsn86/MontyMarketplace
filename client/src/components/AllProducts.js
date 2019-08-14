import React, { Component } from "react";
import { getProducts, getCategories } from "../services/api";
import { Image } from "./common";
import Filter from "./Filter";
import JwPagination from "jw-react-pagination";

import "../styles/AllProducts.css";

export default class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      isLoading: false,
      pageOfItems: [],
      pageSize: 10,
      categories: null,
      filterValues: ["5d4f87a3661c183f766cdec7"]
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.fetchProducts();
    await this.fetchCategories();
  }

  fetchProducts = async () => {
    try {
      const products = await getProducts();
      this.setState({ products, isLoading: false });
    } catch (error) {
      throw error;
    }
  };

    fetchCategories = async () => {
    try {
      const categories = await getCategories();
      this.setState({ categories, isLoading: false });
    } catch (error) {
      throw error;
    }
  };

  renderFilteredProducts = () => {
    const {products, categories, filterValues} = this.state;
    if(filterValues){
      const filter =  filterValues.map(value => {
        return products.filter(product => {
          if (product.category_id == value){
            return product
          }
        })
      })
      return filter[0].map(product => {
        return (
          <div className="products-flex-column">
            <div
              className="products-container"
              key={product._id}
              onClick={() =>
                this.props.history.push({
                  pathname: `/marketplace/apparel/${product._id}`,
                  state: { productId: product._id }
                })
              }
            >
              <Image source={product.imageUrl} alt={product.name} />
              <h3 className="products-name">{product.name}</h3>
              <p className="products-price">${product.price}</p>
            </div>
          </div>
        );
      });
    }
  }

  onChangePage = pageOfItems => {
    this.setState({ pageOfItems: pageOfItems });
  };

  onChangePageSize = async e => {
    const { value } = e.target;
    this.setState({ pageSize: parseInt(value) });
    await this.fetchProducts();
  };

  renderPagination = () => {
    return (
      <div className="pagination">
        <JwPagination
          pageSize={this.state.pageSize}
          items={this.state.products}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  };

  renderProducts = () => {
    const { pageOfItems } = this.state;
    if (pageOfItems) {
      return pageOfItems.map(product => {
        return (
          <div className="products-flex-column">
            <div
              className="products-container"
              key={product._id}
              onClick={() =>
                this.props.history.push({
                  pathname: `/marketplace/apparel/${product._id}`,
                  state: { productId: product._id }
                })
              }
            >
              <Image source={product.imageUrl} alt={product.name} />
              <h3 className="products-name">{product.name}</h3>
              <p className="products-price">${product.price}</p>
            </div>
          </div>
        );
      });
    }
  };

  filterProducts = () => {

  }

  render() {
    return (
      <div>
        <div className="products-row">
          <div className="products-filter-column">
            <Filter />
          </div>
          <div className="products-column">
            <div className="products-flex-wrap">
              {
                this.state.filterValues ? this.renderFilteredProducts() : this.renderProducts()
              }</div>
            <div className="pagination-container">
              {this.renderPagination()}
              {/* {this.renderFilteredProducts()} */}
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }
}
