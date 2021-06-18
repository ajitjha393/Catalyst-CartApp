const { body } = require('express-validator/check')

// Have just kept minimum validation, can add regex for custom validation
exports.signupValidator = [
	body('firstName').trim().not().isEmpty(),
	body('lastName').trim().not().isEmpty(),
	body('email')
		.isEmail()
		.withMessage('Please Enter a Valid Email')
		.normalizeEmail(),

	body('password').trim().isLength({ min: 4 }),
]

exports.loginValidator = [
	,
	body('email')
		.isEmail()
		.withMessage('Please Enter a Valid Email')
		.normalizeEmail(),

	body('password').trim().isLength({ min: 4 }),
]
