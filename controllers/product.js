const { validationResult } = require('express-validator/check')
const Product = require('../models/product')
const { createError } = require('../utils/createError')

exports.addProduct = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			createError(422, 'Validation Failed, Entered Data is incorrect')
		}
		// Will get this from auth middleware after extracting it, for now harcoding it
		const userId = '60cc78ee041ad9f592275026'

		const { title, price, description, imageUrl, quantity } = req.body

		const product = await Product.create({
			title,
			price,
			description,
			imageUrl,
			quantity,
			userId,
		})

		return res.status(201).json({
			message: 'Succesfully added new Product',
			product,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
}
