import { useState } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Product from '../../components/product'
import Modal from '../../components/ui/product-modal'
import classes from './products.module.css'

function Products({ listings }) {
	const [isOpen, setIsOpen] = useState(false)
	const [prodDetail, setProdDetail] = useState(null)

	const { userId } = useParams()
	const { search } = useLocation()
	const history = useHistory()

	console.log(search)
	let productList = []
	let name = null

	if (listings.length) {
		productList = listings.find((p) => Object.keys(p)[0] === userId)[userId]

		console.log(productList)
		const { firstName, lastName } = productList[0].userId
		name = firstName + ' ' + lastName
	} else {
		history.push('/')
	}

	const editProduct = (prodDetail) => {
		setProdDetail(prodDetail)
		setIsOpen(true)
	}
	const deleteProduct = () => {
		setIsOpen(true)
	}

	return (
		<div>
			<h2 className={classes.title}>Product Catalogue of {name}</h2>
			<div className={classes.Products}>
				{productList.map((prod) => (
					<Product
						key={prod._id}
						edit={search === '?edit=true'}
						editProduct={editProduct}
						deleteProduct={deleteProduct}
						{...prod}
					/>
				))}
			</div>
			<Modal open={isOpen} setOpen={setIsOpen} prodDetail={prodDetail} />
		</div>
	)
}

const mapState = (state) => ({
	listings: state.product,
})

export default connect(mapState, null)(Products)
