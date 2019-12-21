import React, { Component } from 'react'

import { ExpansionPanel, ExpansionList } from 'react-md'

import '../styles/Filter.css'

export default class Filter extends Component {
  constructor() {
    super()
    this.state = {
      categories: null,
      isLoading: true
    }
  }

  renderCategories = () => {
    const { categories, addToFilter } = this.props
    if (categories) {
      return categories.map(category => {
        return (
          <ExpansionPanel label={category.name} key={category._id}>
            {category.subCategories.map(subCategory => (
              <>
                <label>{subCategory.name}</label>
                <input type="checkbox" />
              </>
            ))}
          </ExpansionPanel>
        )
      })
    }
  }

  render() {
    return (
      <div className="filter-container">
        <ExpansionList>{this.renderCategories()}</ExpansionList>
        <div className="filter-buttons-container">
          <button
            className="filter-apply-button"
            onClick={this.props.renderFilteredProducts}
          >
            Apply
          </button>
          <button
            className="filter-clear-button"
            onClick={this.props.fetchProducts}
          >
            Clear Filter
          </button>
        </div>
      </div>
    )
  }
}
