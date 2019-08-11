import React, { Component } from 'react'
import { Form, FormInput } from './common'
import Loader from 'react-loader-spinner'
import { Button } from 'muicss/react'
export default class AdminForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			itemToUpdate: null,
			itemName: '',
			brand: '',
			imageUrl: '',
			newImageUrl: '',
			description: '',
			clearance: '',
			prevPage: props.page
		}
	}

	componentDidMount() {
		if (this.props.selectedItem) {
			this.setState({ itemToUpdate: this.props.selectedItem })
			this.setFormData()
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps)
		this.setInitialState()
		console.log(this.state)
	}
	shouldComponentUpdate(nextProps, prevState) {
		return nextProps.page !== prevState.page
	}

	setFormData = () => {
		const {
			selectedItem: { name, brand, imageUrl, description, clearance }
		} = this.props
		this.setState({
			itemName: name,
			brand,
			imageUrl,
			description,
			clearance
		})
	}

	setInitialState = () => {
		this.setState({
			itemName: '',
			brand: '',
			imageUrl: '',
			description: '',
			clearance: ''
		})
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const {
			itemName,
			brand,
			imageUrl,
			description,
			clearance,
			newImageUrl
		} = this.state
		const data = {
			itemName: itemName,
			brand: brand,
			imageUrl: [imageUrl, newImageUrl.length ? newImageUrl : null],
			description: description,
			clearance: clearance && clearance.toLowerCase() === 'yes' ? true : false
		}
		console.log(data)
	}

	renderUpdateForm = () => {
		const {
			itemName,
			brand,
			imageUrl,
			description,
			clearance,
			newImageUrl
		} = this.state
		return (
			<Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
				<FormInput
					label="Item Name"
					name="itemName"
					value={itemName}
					floatingLabel={false}
				/>
				<FormInput label="Brand" name="brand" value={brand} />
				<FormInput
					floatingLabel={false}
					label={`Item Image Url ${1}`}
					name="newImageUrl"
					value={newImageUrl}
				/>
				{imageUrl
					? imageUrl.map((url, index) => (
							<FormInput
								floatingLabel={false}
								key={index}
								label={`Item Image Url ${index + 2}`}
								name="imageUrl"
								value={url}
							/>
					  ))
					: null}
				<FormInput label="Description" name="description" value={description} />
				<FormInput
					floatingLabel={false}
					label="Clearance ex: Yes or No"
					name="clearance"
					value={clearance}
				/>
				<Button type="submit" variant="raised" color="primary">
					Update
				</Button>
			</Form>
		)
	}

	renderAddItemForm = () => {
		const { itemName, brand, imageUrl, description, clearance } = this.state
		return (
			<Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
				<FormInput
					floatingLabel={true}
					label="Item Name"
					name="itemName"
					value={itemName}
				/>
				<FormInput
					floatingLabel={true}
					label="Brand"
					name="brand"
					value={brand}
				/>
				<FormInput
					floatingLabel={true}
					label="Item Image Url"
					name="imageUrl"
					value={imageUrl}
				/>
				<FormInput
					floatingLabel={true}
					label="Description"
					name="description"
					value={description}
				/>
				<FormInput
					label="Clearance ex: Yes or No"
					name="clearance"
					value={clearance}
				/>
				<Button type="submit" variant="raised" color="primary">
					Submit
				</Button>
			</Form>
		)
	}

	renderForms = () => {
		switch (this.state.prevPage) {
			case 3:
				return this.renderUpdateForm()
			case 2:
				return this.renderAddItemForm()
			default:
				return (
					<Loader type="Triangle" color="#00BFFF" height={100} width={100} />
				)
		}
	}

	render() {
		console.log(this.props)
		return this.renderForms()
	}
}
