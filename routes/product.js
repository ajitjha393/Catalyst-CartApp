const { Router } = require('express')

const {
	addProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
} = require('../controllers/product')

const router = Router()

router.get('/', getAllProducts)
router.post('/', addProduct)
router.patch('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

module.exports = router
