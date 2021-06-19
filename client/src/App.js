import { Provider } from 'react-redux'
import store from './store'
import './App.css'
import Listings from './components/listings'
import Navbar from './components/navbar'

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<header>
					<Navbar />
				</header>
				<Listings />
			</div>
		</Provider>
	)
}

export default App
