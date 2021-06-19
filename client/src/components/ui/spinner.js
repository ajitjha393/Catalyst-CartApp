import { Spinner } from 'baseui/spinner'
import classes from './spinner.module.css'
export default () => (
	<div className={classes.center}>
		<Spinner size={96} />
	</div>
)
