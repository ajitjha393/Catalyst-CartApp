const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},

	lastName: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	resetToken: String,
	resetTokenExpiration: Date,

	cart: {
		items: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
	},
})

userSchema.methods.getSignedJwtToken = function () {
	return jwt.sign(
		{
			id: this._id,
		},
		process.env.JWT_SECRET_KEY,
		{
			expiresIn: '1h',
		}
	)
}

module.exports = model('User', userSchema)
