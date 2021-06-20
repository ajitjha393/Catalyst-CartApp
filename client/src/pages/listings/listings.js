import { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import UserCatalogue from '../../components/user-catalogue'

function Listings({ listings, setListings, token }) {
	useEffect(() => {
		if (listings.length === 0) {
			axios
				.get(`${process.env.REACT_APP_API_URL}/product`, {
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
			const { firstName, lastName, email } =
				catalogue[userId][0]['userId']
			return (
				<UserCatalogue
					key={userId}
					userId={userId}
					productCount={catalogue[userId].length}
					name={firstName + ' ' + lastName}
					email={email}
				/>
			)
		})
	}

	return (
		<div>
			<h1 style={{ marginTop: '2rem' }}>Product Listings...</h1>
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
