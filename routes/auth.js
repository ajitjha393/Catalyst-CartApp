const { Router } = require('express')

const { register, activateAccount } = require('../controllers/auth')

const router = Router()

router.post('/register', register)
router.post('/activate', activateAccount)

module.exports = router
