const { Router } = require('express')

const { greet } = require('../controllers/auth')

const router = Router()

router.get('/', greet)
module.exports = router
