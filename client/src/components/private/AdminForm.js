import React, { Component } from 'react'
import '../../styles/AdminForm.css'
import PublicServices from '../../services/PublicServices'
export default class AdminForm extends Component {
  constructor(props) {
    super(props)
    this.Service = new PublicServices()
    this.state = {
      itemData: {
        name: '',
        brand: '',
        image_url: '',
        description: '',
        clearance: false,
        category: '',
        subCategory: '',
        cost: '',
        quantity: '',
        price: '',
        size: '',
        color: ''
      },
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
      const categories = await this.Service.getCategories()
      categories.forEach(category => {
        this.setState(state => {
          state.categories = [...state.categories, category]
          state.itemData.category = categories[0]._id
          state.itemData.subCategory = categories[0].subCategories[0]._id
          state.subCategories = categories[0].subCategories
          return state
        })
      })
      console.log(this.state.subCategories)
    } catch (error) {
      throw error
    }
  }

  renderCategories = () =>
    this.state.categories.length ? (
      <>
        <label htmlFor="category">Primary Category</label>
        <select name="category" onChange={this.handlePrimaryDropDown}>
          {this.state.categories.map((category, index) => (
            <option
              value={index}
            >{`${category.name} (${category.gender})`}</option>
          ))}
        </select>
      </>
    ) : null

  renderSubCategories = () =>
    this.state.subCategories.length ? (
      <>
        <label htmlFor="subCategory">Secondary Category</label>
        <select name="subCategory" onChange={this.handleChange}>
          {this.state.subCategories.map(category => (
            <option value={category._id}>{`${category.name}`}</option>
          ))}
        </select>
      </>
    ) : null

  removeDetail = index => {
    const details = this.state.details
    details.splice(index, 1)
    this.setState({ details })
  }

  handleSubmit = async e => {
    try {
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
              <div className="card">
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
      itemData: { name, description, image_url, color, size, price, quantity }
    } = this.state
    return (
      <div className="wrapper form-container">
        <div className="form-wrapper">
          <form className="form-col">
            <input
              onChange={this.handleChange}
              type="text"
              value={name}
              name="name"
              placeholder="Item Name"
            />
            <input
              onChange={this.handleChange}
              type="text"
              value={description}
              name="description"
              placeholder="Item Description"
            />
            <input
              onChange={this.handleChange}
              type="text"
              value={image_url}
              name="image_url"
              placeholder="Image Url"
            />
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
                <label htmlFor="size">Size</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  value={size}
                  name="size"
                  placeholder="ex: Med"
                />
                <label htmlFor="size">Color</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  value={color}
                  name="color"
                  placeholder="ex: Red"
                />
                <label htmlFor="quantity">Quantity</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  value={quantity}
                  name="quantity"
                  placeholder="ex: 2"
                />
                <label htmlFor="price">Price</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  value={price}
                  name="price"
                  placeholder="ex: 20.00"
                />
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
