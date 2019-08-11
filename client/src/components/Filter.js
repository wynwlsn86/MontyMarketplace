import React, { Component } from 'react'
import {getCategories} from '../services/api'
export default class Filter extends Component {
  constructor(){
    super()
    this.state = {
      categories: null,
      isLoading: true
    }
  }
  fetchCategories = async () => {
		try {
      const categories = await getCategories()
      console.log(categories)
			this.setState({ categories, isLoading: false })
		} catch (error) {
			throw error
		}
  }

  renderCategories = () => {
    const {categories} = this.state
    if(categories){
      return categories.map((category) => {
        console.log(category)
        return(
          <h1>{category.category.toUpperCase()}</h1>
          
        )
      })
    }
  }
  
  componentDidMount = async () => {
    this.fetchCategories()
  }
  
  render() {
    return (
      <div>
        <h1>filter</h1>
        <div>
          {this.renderCategories()}
        </div>
      </div>
    )
  }
}
