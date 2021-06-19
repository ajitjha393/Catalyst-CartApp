import { Card, StyledBody, StyledAction } from 'baseui/card'
import { Button } from 'baseui/button'
import classes from './product.module.css'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri'

function Product(props) {
	const {
		title,
		description,
		imageUrl,
		quantity,
		price,
		edit,
		editProduct,
		deleteProduct,
		_id,
	} = props

	let actionBtn = (
		<Button overrides={{ BaseButton: { style: { width: '100%' } } }}>
			Add to Cart
		</Button>
	)
	if (edit) {
		actionBtn = (
			<div className={classes.IconContainer}>
				<span onClick={() => editProduct(_id)}>
					<FaEdit />
				</span>
				<span onClick={() => deleteProduct(_id)}>
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

					<div>
						Price :{' '}
						<span className={classes.Price}>Rs {price}</span>
					</div>
					<div>
						Qty : <span className={classes.Price}> {quantity}</span>
					</div>
				</StyledBody>
				<StyledAction>{actionBtn}</StyledAction>
			</Card>
		</div>
	)
}

export default Product
