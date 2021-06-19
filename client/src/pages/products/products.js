import { useParams, useLocation, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Product from '../../components/product'
import classes from './products.module.css'

function Products({ listings }) {
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

	return (
		<div>
			<h2 className={classes.title}>Product Catalogue of {name}</h2>
			<div className={classes.Products}>
				{productList.map((prod) => (
					<Product
						key={prod._id}
						edit={search === '?edit=true'}
						{...prod}
					/>
				))}
			</div>
		</div>
	)
}

const mapState = (state) => ({
	listings: state.product,
})

export default connect(mapState, null)(Products)
