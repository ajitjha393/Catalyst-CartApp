const { Router } = require('express')

const { addProduct } = require('../controllers/product')

const router = Router()

router.post('/', addProduct)

module.exports = router
