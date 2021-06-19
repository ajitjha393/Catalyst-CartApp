import ReactDOM from 'react-dom'
import App from './App'

import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'
import './index.css'

const engine = new Styletron()

ReactDOM.render(
	<StyletronProvider value={engine}>
		<BaseProvider theme={LightTheme}>
			<App />
		</BaseProvider>
	</StyletronProvider>,
	document.getElementById('root')
)
