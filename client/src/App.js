import { Provider } from 'react-redux'
import store from './store'
import './App.css'
import Listings from './components/listings'

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<h1>Catalyst Cart App</h1>
				<Listings />
			</div>
		</Provider>
	)
}

export default App
