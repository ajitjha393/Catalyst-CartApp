import { Card, StyledBody, StyledAction } from 'baseui/card'
import { Button } from 'baseui/button'
import classes from './product.module.css'

function Product(props) {
	const { title, description, imageUrl, quantity, price } = props
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
				<StyledAction>
					<Button
						overrides={{ BaseButton: { style: { width: '100%' } } }}
					>
						Add to Cart
					</Button>
				</StyledAction>
			</Card>

			{/*  */}
		</div>
	)
}

export default Product
