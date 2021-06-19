import { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

function Listings({ setListings }) {
	useEffect(() => {
		axios
			.get('http://localhost:8080/product')
			.then(({ data }) => {
				console.log(data)
				setListings(data.products)
			})
			.catch((err) => console.log(err))
	}, [])

	return (
		<div>
			<h1>Product Listings...</h1>
		</div>
	)
}

const mapDispatch = (dispatch) => ({
	setListings: (listing) => dispatch.product.setListings(listing),
})

export default connect(null, mapDispatch)(Listings)
