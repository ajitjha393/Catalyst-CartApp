import { Provider } from 'react-redux'
import store from './store'
import './App.css'
import Listings from './pages/listings/listings'
import Products from './pages/products/products'
import Navbar from './components/navbar'
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
						<Route exact path="/">
							<Listings />
						</Route>
						<Route exact path="/:userId">
							<Products />
						</Route>
					</Switch>
				</div>
			</BrowserRouter>
		</Provider>
	)
}

export default App
