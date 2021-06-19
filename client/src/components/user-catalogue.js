import { Card } from 'baseui/card'
import classes from './user-catalogue.module.css'
import { random } from '../utils/random'
import { useHistory } from 'react-router-dom'

const cardStyles = {
	Root: {
		style: {
			width: '80%',
			margin: '2rem auto',
			maxWidth: '40rem',
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
			cursor: 'pointer',
		},
	},
}

function UserCatalogue({ userId, productCount, name }) {
	const history = useHistory()
	const viewCatalogue = () => {
		history.push(`/${userId}`)
	}

	return (
		<div>
			<Card overrides={cardStyles}>
				<div className={classes.Container} onClick={viewCatalogue}>
					<img
						src={`https://randomuser.me/api/portraits/men/${random(
							0,
							100
						)}.jpg`}
						alt="random user"
					/>
					<div className={classes.Content}>
						<div>
							<span>Name</span> : {name}
						</div>
						<div>
							<span>Products</span> : {productCount}
						</div>

						<div>
							Some Lorem ipsum description, dolor sit amet
							consectetur adipisicing elit. Dolor quia inventore
							fugit esse, consequat
						</div>
					</div>
				</div>
			</Card>
		</div>
	)
}

export default UserCatalogue
