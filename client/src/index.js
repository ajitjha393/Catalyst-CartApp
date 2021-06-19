import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import store from './store'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'
import './index.css'

const engine = new Styletron()

ReactDOM.render(
	<StyletronProvider value={engine}>
		<BaseProvider theme={LightTheme}>
			<Provider store={store}>
				<App />
			</Provider>
		</BaseProvider>
	</StyletronProvider>,
	document.getElementById('root')
)
