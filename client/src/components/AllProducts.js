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
      filterValues: []
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
    if(filterValues.length > 0){
      const filter =  filterValues.map(value => {
        return products.filter(product => {
          if (product.category.group === value){
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

  addToFilter = (e) => {
    console.log("running")
    // if(this.state.filterValues.length > 0){
    //   console.log('if')
      if(this.state.filterValues.includes(e.target.value)){
        let filter = this.state.filterValues.indexOf(e.target.value)
        let newFilter = this.state.filterValues.splice(filter, 1)
        this.setState({filterValues: newFilter})
      }
      else{
        console.log('else')
        const filterValues = this.state.filterValues
        filterValues.push(e.target.value)
        console.log(e.target.value)
        console.log(filterValues)
        this.setState({filterValues})
      }
      
    // }
    // else{
    //   console.log('first else')
    //   const filterValues = e.target.value
    //   this.setState({filterValues})
    // }
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
              <Image source={product.imageUrl} alt={product.name} className="product-images"/>
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
            <Filter 
              addToFilter={this.addToFilter} />
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
