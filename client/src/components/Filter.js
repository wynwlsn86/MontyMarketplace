import React, { Component } from "react";
import { getCategories } from "../services/api";

import { ExpansionPanel, ExpansionList } from "react-md";

import "../styles/Filter.css";

export default class Filter extends Component {
  constructor() {
    super();
    this.state = {
      categories: null,
      isLoading: true
    };
  }
  fetchCategories = async () => {
    try {
      const categories = await getCategories();
      console.log(categories);
      this.setState({ categories, isLoading: false });
    } catch (error) {
      throw error;
    }
  };

  renderCategories = () => {
    const { categories } = this.state;
    if (categories) {
      return categories.map(category => {
        console.log(category);
        return (
          <div>
            {/* {category.attire.map(attire => {
              console.log(attire);
              return (
                <div className="filter-checkbox-container">
                  <input
                    type="checkbox"
                    id={attire}
                    name={attire}
                    onChange={this.renderFilteredProducts}
                  />
                  <label className="filter-label" for={attire}>
                    {attire.toUpperCase()}
                  </label>
                </div>
              );
            })} */}
          </div>
        );
      });
    }
  };

  componentDidMount = async () => {
    this.fetchCategories();
  };

  render() {
    return (
      <div className="filter-container">
        <ExpansionList>
          <ExpansionPanel label="Clothing">
            {/* {this.renderCategories()} */}
            <p>filter content here</p>
          </ExpansionPanel>
          <ExpansionPanel label="Shoes">
            {/* {this.renderCategories()} */}
            <p>filter content here</p>
          </ExpansionPanel>
        </ExpansionList>
      </div>
    );
  }
}
