import React, { Component } from "react";
import { getCategories } from "../services/api";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ExpansionPanel, ExpansionList} from "react-md";
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
        console.log(category);
        return (

          <div className="filter-container">
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="filter-category-header">
                  {category.group.toUpperCase()}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                           {category.attire.map(attire => {
                              console.log(attire);
                              return (
                                <div className="filter-checkbox-container">
                                  <input type="checkbox" id={attire} name={attire} onChange={this.renderFilteredProducts} />
                                  <label className="filter-label" for={attire}>
                                    {attire.toUpperCase()}
                                  </label>
                                </div>
                              );
                            })}  
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>




      )
      })
    }
  };

  componentDidMount = async () => {
    this.fetchCategories();
  };

  render() {
    return <div className="filter-container">
            {this.renderCategories()}
            <button>Filter</button>
           </div>
  }
}
