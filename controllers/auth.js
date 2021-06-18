const User = require('../models/user')
const { validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail')
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {
	try {
		const { firstName, lastName, email, password } = req.body
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const err = new Error('Validation Failed')
			err.statusCode = 422
			err.data = errors.array()
			throw err
		}

		const user = await User.findOne({
			email,
		})

		if (user) {
			throw new Error('User with email already exists!')
		}

		const activateToken = jwt.sign(
			{
				firstName,
				lastName,
				email,
				password,
			},
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: '20min',
			}
		)

		const activateUrl = `${process.env.FRONT_END_URI}/activate-account/${activateToken}`

		const message = `
		      <h1>Activate Your Account</h1>
		      <p>Please go to this link to activate your account</p>
		      <a href=${activateUrl} clicktracking=off >${activateUrl}</a>
		      `

		await sendEmail({
			recipient: email,
			msgBody: message,
		})

		res.status(200).json({
			success: true,
			data: 'email sent!',
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
}

exports.activateAccount = async (req, res, next) => {
	try {
		const { activateToken: token } = req.body

		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

		const { firstName, lastName, email, password } = decoded

		const hashedPassword = await bcrypt.hash(password, 12)

		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			cart: { items: [] },
		})

		return res.status(201).json({
			success: true,
			token: user.getSignedJwtToken(),
		})
	} catch (error) {
		next(error)
	}
}
