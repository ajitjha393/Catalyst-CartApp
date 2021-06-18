const { validationResult } = require('express-validator/check')
const Product = require('../models/product')
const { createError } = require('../utils/createError')

exports.getAllProducts = async (req, res, next) => {
	try {
		const products = await Product.find().populate('userId')

		return res.status(200).json({
			message: 'Fetching all products...',
			products,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
}

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

exports.updateProduct = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			createError(422, 'Validation Failed, Entered Data is incorrect')
		}

		// Will get this from auth middleware after extracting it, for now harcoding it
		const userId = '60cc78ee041ad9f592275026'

		const { productId } = req.params

		const { price, quantity } = req.body

		const product = await Product.findById(productId)
		if (!product) {
			createError(404, 'Could Not Find a post.')
		}

		if (product.userId.toString() !== userId) {
			createError(403, 'Not Authorized for Editing This Product')
		}

		product.price = price
		product.quantity = quantity

		const result = await product.save()

		return res.status(200).json({
			message: 'Product Updated',
			product: result,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
}

exports.deleteProduct = async (req, res, next) => {
	try {
		const { productId } = req.params

		// Will get this from auth middleware after extracting it, for now harcoding it
		const userId = '60cc78ee041ad9f592275026'

		const product = await Product.findById(productId)
		if (!product) {
			createError(404, 'Could Not Find a post.')
		}
		// This Check ensures only the user who created that product can delete as well

		if (product.userId.toString() !== userId) {
			createError(403, 'Not Authorized for Deleting This Product')
		}

		const result = await Product.findByIdAndRemove(productId)

		return res.status(200).json({
			message: 'Product Deleted Successfully',
			post: result,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
}
