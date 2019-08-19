import React, { Component } from "react";
import { getCategories } from "../services/api";
<<<<<<< HEAD
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
=======

import { ExpansionPanel, ExpansionList} from "react-md";
>>>>>>> bc194b79d9689663d8ec43f9b0a24cf0558359b2

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
      // console.log(categories);
      this.setState({ categories, isLoading: false });
    } catch (error) {
      throw error;
    }
  };

  renderCategories = () => {
    const { categories } = this.state;
    if (categories) {
      return categories.map(category => {
        // console.log(category);
        return (
<<<<<<< HEAD
          <div className="filter-container">
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="filter-category-header">
                  {category.category.toUpperCase()}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {category.attire.map(attire => {
                    // console.log(attire);
=======
          <div>

                {/* {category.attire.map(attire => {
                    console.log(attire);
>>>>>>> bc194b79d9689663d8ec43f9b0a24cf0558359b2
                    return (
                      <div className="filter-checkbox-container">
                        <input type="checkbox" id={attire} name={attire} onChange={this.renderFilteredProducts} />
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
    return           <div className="filter-container">
    <ExpansionList>
      <ExpansionPanel label="Apparel">
        {this.renderCategories()}
      </ExpansionPanel>
      <ExpansionPanel label="Shoes">
        {this.renderCategories()}
      </ExpansionPanel>
    </ExpansionList>
  </div>
  }
}
