const { Router } = require('express')
const isAuth = require('../middleware/is-auth')

const {
	addProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
} = require('../controllers/product')

const router = Router()

router.get('/', isAuth, getAllProducts)
router.post('/', isAuth, addProduct)
router.patch('/:productId', isAuth, updateProduct)
router.delete('/:productId', isAuth, deleteProduct)

module.exports = router
