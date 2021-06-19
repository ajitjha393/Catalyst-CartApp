import { useState } from 'react'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { Textarea } from 'baseui/textarea'
import { Button, KIND as ButtonKind } from 'baseui/button'
import classes from './new-product.module.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const BASE_ENDPOINT = 'http://localhost:8080/product'

function NewProduct({ setListings }) {
	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')
	const [quantity, setQuantity] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [description, setDescription] = useState('')

	const history = useHistory()

	const addNewProduct = () => {
		// Added basic validation
		const product = {
			title: title.trim(),
			price: +price.trim(),
			quantity: +quantity.trim(),
			description: description.trim(),
			imageUrl,
		}
		for (let [k, v] of Object.entries(product)) {
			if (v === '' || v === 0) {
				alert(`${k} cannot be empty...`)
				return
			}
			if (Number.isNaN(v)) {
				alert(`${k} has to be a number `)
				return
			}
		}

		axios
			.post(BASE_ENDPOINT, product)
			.then(({ data }) => {
				// will add spinner here
				console.log(data)
				setListings(data.allProducts)
				history.push('/')
			})
			.catch((err) => console.log(err))

		console.log(product)
	}

	const clearInputFields = () => {
		setTitle('')
		setPrice('')
		setQuantity('')
		setImageUrl('')
		setDescription('')
	}

	return (
		<>
			<h2 className={classes.header}>Add New Product!</h2>
			<div className={classes.form}>
				<FormControl label="Title">
					<Input
						id="input-id"
						value={title}
						onChange={(event) =>
							setTitle(event.currentTarget.value)
						}
					/>
				</FormControl>
				<FormControl label="Price (Rs)">
					<Input
						id="input-id"
						value={price}
						onChange={(event) =>
							setPrice(event.currentTarget.value)
						}
					/>
				</FormControl>
				<FormControl label="Quantity">
					<Input
						id="input-id"
						value={quantity}
						onChange={(event) =>
							setQuantity(event.currentTarget.value)
						}
					/>
				</FormControl>
				<FormControl label="Image Url">
					<Input
						id="input-id"
						value={imageUrl}
						onChange={(event) =>
							setImageUrl(event.currentTarget.value)
						}
						type="url"
					/>
				</FormControl>

				<FormControl label="Textarea">
					<Textarea
						id="textarea-id"
						value={description}
						onChange={(event) =>
							setDescription(event.currentTarget.value)
						}
					/>
				</FormControl>
				<div className={classes.actions}>
					<Button
						onClick={clearInputFields}
						kind={ButtonKind.secondary}
					>
						RESET
					</Button>

					<Button onClick={addNewProduct}> ADD </Button>
				</div>
			</div>
		</>
	)
}

const mapDispatch = (dispatch) => ({
	setListings: (listing) => dispatch.product.setListings(listing),
})
export default connect(null, mapDispatch)(NewProduct)
