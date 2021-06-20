import { useState } from 'react'
import { Modal, ModalFooter, ModalButton, SIZE, ROLE } from 'baseui/modal'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { KIND as ButtonKind } from 'baseui/button'
import { connect } from 'react-redux'
import classes from './product-modal.module.css'
import axios from 'axios'

const BASE_ENDPOINT = `${process.env.REACT_APP_API_URL}/product`

function ProductModal({
	open,
	setOpen,
	prodId,
	del,
	setListings,
	setLoading,
	token,
}) {
	const [price, setPrice] = useState('')
	const [quantity, setQuantity] = useState('')

	const editProduct = () => {
		setOpen(false)
		console.log({
			price,
			quantity,
			prodId,
		})
		const editProductData = {
			price: +price.trim(),
			quantity: +quantity.trim(),
		}
		for (let [k, v] of Object.entries(editProductData)) {
			if (v === 0) {
				alert(`${k} cannot be empty...`)

				return
			}
			if (Number.isNaN(v)) {
				alert(`${k} has to be a number `)
				return
			}
		}

		setLoading(true)

		axios
			.patch(
				`${BASE_ENDPOINT}/${prodId}`,
				{
					price,
					quantity,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
				}
			)
			.then(({ data }) => {
				console.log(data)
				setLoading(false)
				setListings(data.allProducts)
			})
			.catch((err) => console.log(err))
	}

	const deleteProduct = () => {
		console.log('Deleting...', prodId)
		setOpen(false)
		setLoading(true)
		console.log('...', token)

		axios
			.delete(`${BASE_ENDPOINT}/${prodId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			})
			.then(({ data }) => {
				setLoading(false)
				console.log(data)
				setListings(data.allProducts)
			})
			.catch((err) => console.log(err))
	}

	let compBody = null
	if (del) {
		compBody = (
			<div className={classes.prompt}>
				Are you sure you want to delete this Product ?
			</div>
		)
	} else {
		compBody = (
			<>
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
			</>
		)
	}

	return (
		<Modal
			onClose={() => setOpen(false)}
			closeable
			isOpen={open}
			animate
			autoFocus
			size={SIZE.default}
			role={ROLE.dialog}
		>
			<h2 className={classes.header}> Edit Product Detail</h2>
			<div className={classes.form}>{compBody}</div>
			<ModalFooter>
				<ModalButton
					kind={ButtonKind.tertiary}
					onClick={() => setOpen(false)}
				>
					Cancel
				</ModalButton>
				<ModalButton onClick={del ? deleteProduct : editProduct}>
					{' '}
					{del ? 'Delete' : 'Save'}
				</ModalButton>
			</ModalFooter>
		</Modal>
	)
}

const mapState = (state) => ({
	token: state.user.token,
})

const mapDispatch = (dispatch) => ({
	setListings: (listing) => dispatch.product.setListings(listing),
})
export default connect(mapState, mapDispatch)(ProductModal)
