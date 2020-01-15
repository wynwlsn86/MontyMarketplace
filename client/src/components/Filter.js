import React from 'react'

import { ExpansionPanel, ExpansionList } from 'react-md'

import '../styles/Filter.css'

const Filter = props => {
  const renderCategories = () => {
    const { categories, addToFilter } = props
    if (categories) {
      return categories.map((category, index) => {
        return (
          <ExpansionPanel label={category.name} key={category._id}>
            {category.subCategories.map((subCategory, subIndex) => (
              <div key={subCategory._id}>
                <label>{subCategory.name}</label>
                <input
                  type="checkbox"
                  value={subCategory.isChecked}
                  checked={subCategory.isChecked}
                  onChange={() =>
                    addToFilter({ index, subIndex }, subCategory._id)
                  }
                />
              </div>
            ))}
          </ExpansionPanel>
        )
      })
    }
  }
  return (
    <div className="filter-container">
      <ExpansionList>{renderCategories()}</ExpansionList>
      <div className="filter-buttons-container">
        <button
          className="filter-apply-button"
          onClick={props.applyFilter}
          disabled={props.disableApply}
        >
          Apply
        </button>
        <button className="filter-clear-button" onClick={props.resetAll}>
          Clear Filter
        </button>
      </div>
    </div>
  )
}

export default Filter
