const { Router } = require('express')

const { register, activateAccount, login } = require('../controllers/auth')

const { loginValidator, signupValidator } = require('../validation/index')

const router = Router()

router.post('/register', signupValidator, register)
router.post('/activate', activateAccount)
router.post('/login', loginValidator, login)

module.exports = router
