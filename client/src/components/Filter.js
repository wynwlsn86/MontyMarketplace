import React, { Component } from 'react'
import { getCategories } from '../services/api'

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
	// fetchCategories = async () => {
	//   try {
	// const categories = await getCategories();
	//     console.log(categories);
	//     this.setState({ categories, isLoading: false });
	//   } catch (error) {
	//     throw error;
	//   }
	// };

	renderCategories = () => {
		const { categories, addToFilter } = this.props
		if (categories) {
			// console.log(categories)
			return categories.map((category) => {
				return (
					<ExpansionPanel label={category.group} key={category._id}>
						{category.attire.map((attire) => {
							const group = category.group
							return (
								<div key={attire} className="filter-checkbox-container">
									<input
										type="checkbox"
										value={attire}
										onChange={() => addToFilter({ group, attire })}
									/>
									<label className="filter-label" style={{ color: '#333' }}>
										{attire}
									</label>
								</div>
							)
						})}
					</ExpansionPanel>
				)
			})
		}
	}

	// componentDidMount = async () => {
	// 	this.fetchCategories()
	// }

	render() {
		return (
			<div className="filter-container">
				<ExpansionList>{this.renderCategories()}</ExpansionList>
				<button onClick={this.props.renderFilteredProducts}>Apply</button>
				<button onClick={this.props.fetchProducts}>Clear Filter</button>
			</div>
		)
	}
}

{
	/* <div >
<input type="checkbox" id={attire} name={attire} />
<label for={attire}> */
}
