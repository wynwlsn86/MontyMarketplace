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
			images: [],
			imageUrl: '',
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
		this.setInitialState()
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
			newImageUrl,
			images
		} = this.state
		const data = {
			itemName: itemName,
			brand: brand,
			imageUrl: imageUrl.length ? [...images, imageUrl] : [...images],
			description: description,
			clearance: clearance && clearance.toLowerCase() === 'yes' ? true : false
		}
		console.log(data)
	}

	handleImageFields = () => {
		this.setState({
			images: [...this.state.images, this.state.imageUrl],
			imageUrl: ''
		})
	}

	handleRemoveImage = (item) => {
		this.state.images.splice(item, 1)
		this.setState({ images: [...this.state.images] })
	}

	renderUpdateForm = () => {
		const {
			itemName,
			brand,
			imageUrl,
			images,
			description,
			clearance
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
				<div className="image-input">
					<FormInput
						floatingLabel={false}
						label={`Item Image Url ${1}`}
						name="newImageUrl"
						value={images[0] || imageUrl}
					/>
					<Button
						variant="fab"
						color="primary"
						size="small"
						type="button"
						onClick={this.handleImageFields}>
						+
					</Button>
				</div>
				{images
					? images.map((url, index) => (
							<div className="image-input" key={index}>
								<FormInput
									floatingLabel={false}
									label={`Item Image Url ${index + 2}`}
									name="imageUrl"
									value={imageUrl}
								/>
								<Button
									variant="fab"
									color="primary"
									size="small"
									type="button"
									onClick={this.handleImageFields}>
									+
								</Button>
								<Button
									variant="fab"
									color="danger"
									size="small"
									type="button"
									onClick={() => this.handleRemoveImage(url)}>
									-
								</Button>
							</div>
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
		const {
			itemName,
			brand,
			imageUrl,
			description,
			clearance,
			images
		} = this.state
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
				<div className="image-input">
					<FormInput
						floatingLabel={false}
						label={`Item Image Url ${1}`}
						name="imageUrl"
						value={imageUrl}
					/>
					<Button
						variant="fab"
						type="button"
						color="primary"
						size="small"
						onClick={this.handleImageFields}>
						+
					</Button>
				</div>
				{images
					? images.map((url, index) => (
							<div className="image-input" key={index}>
								<FormInput
									floatingLabel={false}
									label={`Item Image Url ${index + 2}`}
									name="imageUrl"
									value={imageUrl}
								/>
								<Button
									variant="fab"
									color="primary"
									size="small"
									type="button"
									onClick={this.handleImageFields}>
									+
								</Button>
								<Button
									variant="fab"
									color="danger"
									size="small"
									type="button"
									onClick={() => this.handleRemoveImage(url)}>
									-
								</Button>
							</div>
					  ))
					: null}
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
		return this.renderForms()
	}
}
