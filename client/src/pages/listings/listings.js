import { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import UserCatalogue from '../../components/user-catalogue'

function Listings({ listings, setListings, token }) {
	useEffect(() => {
		if (listings.length === 0) {
			axios
				.get('http://localhost:8080/product', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
				})
				.then(({ data }) => {
					console.log(data)
					setListings(data.products)
				})
				.catch((err) => console.log(err))
		}
	}, [listings.length, setListings])

	let mappedCatalogue = null
	if (listings) {
		mappedCatalogue = listings.map((catalogue) => {
			const [userId] = Object.keys(catalogue)
			const { firstName, lastName } = catalogue[userId][0]['userId']
			return (
				<UserCatalogue
					key={userId}
					userId={userId}
					productCount={catalogue[userId].length}
					name={firstName + ' ' + lastName}
				/>
			)
		})
	}

	return (
		<div>
			<h1>Product Listings...</h1>
			{mappedCatalogue}
		</div>
	)
}

const mapState = (state) => ({
	listings: state.product,
	token: state.user.token,
})

const mapDispatch = (dispatch) => ({
	setListings: (listing) => dispatch.product.setListings(listing),
})

export default connect(mapState, mapDispatch)(Listings)
