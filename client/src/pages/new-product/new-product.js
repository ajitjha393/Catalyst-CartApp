import { useState } from 'react'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { Textarea } from 'baseui/textarea'
import { Button, KIND as ButtonKind } from 'baseui/button'
import classes from './new-product.module.css'

function NewProduct() {
	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')
	const [quantity, setQuantity] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [description, setDescription] = useState('')

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
						onClick={() => alert('click')}
						kind={ButtonKind.secondary}
					>
						RESET
					</Button>

					<Button onClick={() => alert('click')}> ADD </Button>
				</div>
			</div>
		</>
	)
}

export default NewProduct
