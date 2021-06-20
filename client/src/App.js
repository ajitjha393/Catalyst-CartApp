import './App.css'
import Listings from './pages/listings/listings'
import Products from './pages/products/products'
import Navbar from './components/navbar'
import NewProduct from './pages/new-product/new-product'
import Login from './pages/login/login'
import SignUp from './pages/signup/signup'
import { useEffect } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

function App({ authenticated, verifyToken }) {
	useEffect(() => {
		verifyToken()
		if (authenticated) {
			console.log('Authenticated...')
		}
	}, [authenticated, verifyToken])

	let routes = (
		<Switch>
			<Route exact path="/login">
				<Login />
			</Route>
			<Route exact path="/signup">
				<SignUp />
			</Route>
			<Redirect to="/" />
		</Switch>
	)

	if (authenticated) {
		routes = (
			<Switch>
				<Route exact path="/catalogue">
					<Listings />
				</Route>
				<Route exact path="/catalogue/:userId">
					<Products />
				</Route>
				<Route exact path="/new-product">
					<NewProduct />
				</Route>
				<Redirect to="/" />
			</Switch>
		)
	}

	return (
		<BrowserRouter>
			<div className="App">
				<header>
					<Navbar />
				</header>

				{routes}
			</div>
		</BrowserRouter>
	)
}

const mapState = (state) => ({
	authenticated: state.user.authenticated,
})

const mapDispatch = (dispatch) => ({
	verifyToken: dispatch.user.verifyExistingToken,
})

export default connect(mapState, mapDispatch)(App)
