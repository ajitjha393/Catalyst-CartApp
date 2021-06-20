const User = require('../models/user')
const { validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail')
const bcrypt = require('bcryptjs')
const { createError } = require('../utils/createError')

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

		if (await User.findOne({ email })) {
			throw new Error('User is already verified')
		}

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

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email })
		if (!user) {
			return createError(401, 'Cannot find User with this email!')
		}

		if (!(await bcrypt.compare(password, user.password))) {
			return createError(401, 'Wrong Password')
		}

		const token = user.getSignedJwtToken()
		const { _id, firstName, lastName } = user
		const name = `${firstName} ${lastName}`

		return res.status(200).json({
			userId: _id.toString(),
			token,
			name,
			email,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
}
