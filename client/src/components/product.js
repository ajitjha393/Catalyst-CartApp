import { Card, StyledBody, StyledAction } from 'baseui/card'
import { Button } from 'baseui/button'
import classes from './product.module.css'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri'

function Product(props) {
	const { title, description, imageUrl, quantity, price, edit } = props

	let actionBtn = (
		<Button overrides={{ BaseButton: { style: { width: '100%' } } }}>
			Add to Cart
		</Button>
	)
	if (edit) {
		actionBtn = (
			<div className={classes.IconContainer}>
				<span onClick={}>
					<FaEdit />
				</span>
				<span onClick={}>
					<RiDeleteBin5Fill />
				</span>
			</div>
		)
	}

	return (
		<div className={classes.Product}>
			<Card
				overrides={{ Root: { style: { width: '220px' } } }}
				headerImage={imageUrl}
				title={title}
			>
				<StyledBody>
					{description}

					<div className={classes.Price}>Price: Rs {price} </div>
					<div className={classes.Price}>Qty : {quantity} </div>
				</StyledBody>
				<StyledAction>{actionBtn}</StyledAction>
			</Card>
		</div>
	)
}

export default Product
