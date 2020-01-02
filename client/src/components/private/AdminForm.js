import React, { Component } from 'react'
import '../../styles/AdminForm.css'
import PublicServices from '../../services/PublicServices'
import AuthService from '../../services/AuthServices'
import UploadForm from './components/UploadForm'
import DropDown from './components/Dropdowns'
export default class AdminForm extends Component {
  constructor(props) {
    super(props)
    this.PublicService = new PublicServices()
    this.AuthService = new AuthService()
    this.state = {
      itemData: {
        name: '',
        brand: '',
        image_url: '',
        description: '',
        cost: '',
        price: ''
      },
      detailData: {
        quantity: '',
        size: '',
        color: ''
      },
      clearance: false,
      category: '',
      subCategory: '',
      images: [],
      details: [],
      categories: [],
      subCategories: []
    }
  }

  componentDidMount() {
    this.getCategories()
  }

  handlePrimaryDropDown = e => {
    let index = e.target.value
    this.setState(state => {
      state.subCategories = state.categories[index].subCategories
      state.itemData.category = state.categories[index]._id
      state.itemData.subCategory = state.categories[0]._id
      return state
    })
  }

  getCategories = async () => {
    try {
      const categories = await this.PublicService.getCategories()
      categories.forEach(category => {
        this.setState(state => {
          state.categories = [...state.categories, category]
          state.category = categories[0]._id
          state.subCategory = categories[0].subCategories[0]._id
          state.subCategories = categories[0].subCategories
          return state
        })
      })
    } catch (error) {
      throw error
    }
  }

  renderCategories = () =>
    this.state.categories.length ? (
      <DropDown
        categories={this.state.categories}
        label="Primary Categories"
        name="category"
      />
    ) : null

  renderSubCategories = () =>
    this.state.subCategories.length ? (
      <DropDown
        categories={this.state.subCategories}
        label="Sub Categories"
        name="subCategory"
      />
    ) : null

  removeDetail = index => {
    const details = this.state.details
    details.splice(index, 1)
    this.setState({ details })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const {
        itemData: {
          brand,
          name,
          image_url,
          description,
          subCategory,
          category,
          clearance,
          price
        }
      } = this.state
      const data = {
        name,
        brand,
        image_url: [image_url],
        description,
        subCategory_id: subCategory,
        caetgory_id: category,
        clearance,
        price
      }
      const resp = await this.AuthService.addItemToInventory(data)
      if (resp.status === 200 || resp.status === 201) {
        this.props.history.push('/admin/dashboard')
      }
    } catch (error) {
      throw error
    }
  }

  renderDetails = () => {
    const { details } = this.state
    if (details.length) {
      return (
        <div className="detail-wrapper">
          <h3>Added Details</h3>
          <div className="wrapper detail-card-wrapper">
            {details.map((detail, index) => (
              <div className="card" key={index}>
                <button type="button" onClick={() => this.removeDetail(index)}>
                  X
                </button>
                <h3>Price: ${detail.price}</h3>
                <h3>Quantity: {detail.quantity}</h3>
                <h3>Color: {detail.color}</h3>
                <h3>Size: {detail.size}</h3>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  handleChange = e => {
    const values = { [e.target.name]: e.target.value }
    this.setState({ itemData: Object.assign(this.state.itemData, values) })
  }

  addItemToArray = (listType, values) => {
    this.setState(
      state => ({ [listType]: [...state[listType], values] }),
      () => {
        for (const key in values) {
          this.setState(state => {
            state.itemData[key] = ''
            return state
          })
        }
      }
    )
  }

  render() {
    const {
      itemData: { color, size, price, quantity }
    } = this.state
    return (
      <div className="wrapper form-container">
        <div className="form-wrapper">
          <form className="form-col" onSubmit={this.handleSubmit}>
            <UploadForm formData={this.state.itemData} />
            <label htmlFor="clearance">Clearance Item</label>
            <select name="clearance" onChange={this.handleChange}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
            {this.renderCategories()}
            {this.renderSubCategories()}
            <div className=" item-details">
              <h3>Item Details</h3>
              <div className="input-wrapper row">
                <UploadForm formData={this.state.detailData} />
                <button
                  type="button"
                  onClick={() =>
                    this.addItemToArray('details', {
                      color,
                      price,
                      quantity,
                      size
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
            <button type="submit">Add Item</button>
          </form>
        </div>

        {this.renderDetails()}
      </div>
    )
  }
}
