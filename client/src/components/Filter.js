import React, { Component } from 'react'
import {getCategories} from '../services/api'

import "../styles/Filter.css";

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
          <div className="filter-container">
            <h1 className="filter-category-header">{category.category.toUpperCase()}</h1>
            {
              category.attire.map((attire) => {
                console.log(attire)
                return(
                  <div className="filter-checkbox-container">
                    <input type="checkbox" id={attire} name={attire}/>
                    <label className="filter-label" for={attire}>{attire.toUpperCase()}</label>
                  </div>
              )})
            }
          </div>

        )
      })
    }
  }
  
  componentDidMount = async () => {
    this.fetchCategories()
  }
  
  // RACHELLLLLL THE FONT COLOR FOR LABEL TAGS ARE WHITE!!!! THIS IS WHY YOU CAN'T SEE THEM
  // YOU HAVE NO IDEA THE FRUSTRAING 5 MINUTES I SPENT FIGURING THAT OUT!!!
  // HOPE THIS SAVES YOU THE SAME FRUSTRATION!!!!!
  // <2

  
  render() {
    return (

        <div>
          {this.renderCategories()}
        </div>
    )
  }
}
