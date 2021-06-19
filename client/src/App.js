import { Provider } from 'react-redux'
import store from './store'
import './App.css'
import Listings from './pages/listings/listings'
import Products from './pages/products/products'
import Navbar from './components/navbar'
import NewProduct from './pages/new-product/new-product'
import Login from './pages/login/login'
import SignUp from './pages/signup/signup'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
					<header>
						<Navbar />
					</header>
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
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/signup">
							<SignUp />
						</Route>
					</Switch>
				</div>
			</BrowserRouter>
		</Provider>
	)
}

export default App
