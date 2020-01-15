import React, { Component } from 'react'
import AuthService from '../../services/AuthServices'
import PublicService from '../../services/PublicServices'
import '../../styles/Departments.css'
import UploadForm from './components/UploadForm'
export default class Departments extends Component {
  constructor() {
    super()
    this.AuthService = new AuthService()
    this.PublicService = new PublicService()
    this.state = {
      category: {
        name: '',
        gender: '',
        department: ''
      },
      subCategory: '',
      subCategories: [],
      categories: []
    }
  }

  componentDidMount() {
    this.fetchCategories()
  }

  fetchCategories = async () => {
    try {
      const categories = await this.PublicService.getCategories()
      this.setState({ categories })
    } catch (error) {
      throw error
    }
  }

  handleChange = (value, name, dataValue) => {
    dataValue
      ? this.setState(state => {
          const values = { [name]: value }
          state[dataValue] = Object.assign(state[dataValue], values)
          return state
        })
      : this.setState({ [name]: value })
  }

  handleShow = index => {
    this.setState(state => {
      state.categories[index].isChecked = !state.categories[index].isChecked
      return state
    })
  }

  toggleAdd = index =>
    this.setState(state => {
      state.categories[index].toAdd = !state.categories[index].toAdd
      return state
    })

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const { name, gender, department } = this.state.category
      const category = await this.AuthService.createCategory({
        category: { name: name.toLowerCase(), gender: gender.toLowerCase() },
        subCategories: [{ name: department }]
      })
      const redefinedCategory = {
        ...category.data,
        isChecked: false
      }
      this.setState(state => ({
        categories: [...state.categories, redefinedCategory]
      }))
    } catch (error) {
      throw error
    }
  }

  handleDelete = (index, id) => {
    const categories = this.state.categories
    categories.splice(index, 1)
    this.setState(
      {
        categories
      },
      async () => await this.AuthService.removeCategory(id)
    )
  }

  displayCategories = () => {
    if (this.state.categories.length) {
      let coords = {
        x: 0,
        y: 0
      }

      return this.state.categories.map((category, index) => {
        coords.x++
        if (coords.x >= 4) {
          coords.x = 1
        }
        return (
          <div
            className={`card ${category.isChecked ? 'selected' : 'closed'}`}
            key={category._id}
          >
            <h2>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </h2>
            <p>For {category.gender}</p>
            <button onClick={() => this.handleDelete(index, category._id)}>
              X
            </button>
            <button
              className="primary show"
              onClick={() => this.handleShow(index)}
            >
              {category.isChecked ? 'Hide Departments' : 'Show Departments'}
            </button>
            {category.toAdd ? (
              <div className="wrapper-row">
                <input
                  className="input"
                  name="subCategory"
                  value={this.state.subCategory}
                  onChange={e =>
                    this.handleChange(e.target.value, e.target.name)
                  }
                  placeholder="New Department"
                />
                <button className="add-sub">+</button>
              </div>
            ) : null}
            {category.isChecked ? (
              <div className="lower-wrapper">
                <div className="sub-wrapper">
                  {category.subCategories.map((sub, i) => (
                    <div className="card-sub" key={i}>
                      <h3>
                        {sub.name.charAt(0).toUpperCase() + sub.name.slice(1)}
                      </h3>
                    </div>
                  ))}
                </div>
                <button
                  className="primary"
                  onClick={() => this.toggleAdd(index)}
                >
                  Add Department
                </button>
              </div>
            ) : null}
          </div>
        )
      })
    }
  }

  render() {
    return (
      <div className="departments department-wrapper">
        <div className="form-wrapper">
          <form className="form-col" onSubmit={this.handleSubmit}>
            <UploadForm
              formData={this.state.category}
              onChange={this.handleChange}
              dataValue="category"
            />
            <button className="primary" type="submit">
              Add Category
            </button>
          </form>
        </div>
        <div className="wrapper">{this.displayCategories()}</div>
      </div>
    )
  }
}
