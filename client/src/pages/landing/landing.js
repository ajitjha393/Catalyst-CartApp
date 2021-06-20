import CatalystImg from '../../assets/cart-app.svg'
import classes from './landing.module.css'

function LandingPage() {
	return (
		<div className={classes.ImageContainer}>
			<img src={CatalystImg} alt="Catalyst Logo" />
		</div>
	)
}

export default LandingPage
