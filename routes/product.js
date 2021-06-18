const { Router } = require('express')

const {
	addProduct,
	getAllProducts,
	deleteProduct,
} = require('../controllers/product')

const router = Router()

router.get('/', getAllProducts)
router.post('/', addProduct)
router.delete('/:productId', deleteProduct)

module.exports = router
