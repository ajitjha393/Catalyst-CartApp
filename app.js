const express = require('express')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')

const { credentials } = require('./utils/credentials')

const app = express()

app.use(express.json())

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE'
	)
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
})

app.use('/auth', authRoutes)
app.use('/product', productRoutes)

// General Express Error Handling middleware

app.use((err, _req, res, _next) => {
	console.log(err)
	const statusCode = err.statusCode || 500
	const message = err.message
	const data = err.data

	return res.status(statusCode).json({
		message,
		data,
	})
})

// Connecting to DB

const port = process.env.PORT || 8080

mongoose
	.connect(credentials)
	.then((_) => {
		app.listen(port)
		console.log(`Listening at port : ${port}`)
	})
	.catch((err) => console.log(err))
