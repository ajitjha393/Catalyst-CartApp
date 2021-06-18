const { Router } = require('express')

const { addProduct, getAllProducts } = require('../controllers/product')

const router = Router()

router.get('/', getAllProducts)
router.post('/', addProduct)

module.exports = router
