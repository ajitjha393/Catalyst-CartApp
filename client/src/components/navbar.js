import { useState, useEffect } from 'react'
import { AppNavBar, setItemActive } from 'baseui/app-nav-bar'
import { ArrowRight, Delete, Overflow } from 'baseui/icon'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

let authNavLink = [
	{
		icon: ArrowRight,
		label: 'HomePage',
	},
	{ icon: ArrowRight, label: 'Catalogue', active: true },
	{ icon: ArrowRight, label: 'Add Product' },
	{
		icon: ArrowRight,
		label: 'Admin Products',
	},
	{
		icon: ArrowRight,
		label: 'Cart',
	},
]

let NavLink = [
	{
		icon: ArrowRight,
		label: 'HomePage',
		active: true,
	},
	{
		icon: ArrowRight,
		label: 'Login',
	},
	{
		icon: ArrowRight,
		label: 'Signup',
	},
]

function Navbar({ isAuthenticated, fullName, email, logout, userId }) {
	const history = useHistory()
	const [mainItems, setMainItems] = useState(NavLink)

	useEffect(() => {
		if (isAuthenticated) {
			setMainItems(authNavLink)
		} else {
			setMainItems(NavLink)
		}
	}, [isAuthenticated])

	let userDetail = {}
	if (isAuthenticated) {
		userDetail = {
			username: fullName,
			usernameSubtitle: email,
			userItems: [{ icon: Overflow, label: 'Logout' }],
			onUserItemSelect: () => {
				console.log('Logging out...')
				logout()
				history.push('/')
			},
		}
		console.log(userDetail)
	}

	return (
		<AppNavBar
			title="Catalyst App"
			mainItems={mainItems}
			onMainItemSelect={(item) => {
				setMainItems((prev) => setItemActive(prev, item))
				switch (item.label) {
					case 'Admin Products': {
						history.push({
							pathname: '/catalogue/' + userId,
							search: '?edit=true',
						})
						break
					}
					case 'Catalogue': {
						history.push('/catalogue')
						break
					}

					case 'Add Product': {
						history.push('/new-product')
						break
					}

					case 'Login': {
						history.push('/login')
						break
					}
					case 'Signup': {
						history.push('/signup')
						break
					}
					case 'Cart': {
						history.push('/cart')
						break
					}
					case 'HomePage': {
						history.push('/')
						break
					}
				}
			}}
			{...userDetail}
		/>
	)
}

const mapState = (state) => ({
	isAuthenticated: state.user.authenticated,
	fullName: state.user.fullName,
	email: state.user.email,
	userId: state.user.userId,
})

const mapDispatch = (dispatch) => ({
	logout: dispatch.user.logout,
})

export default connect(mapState, mapDispatch)(Navbar)
