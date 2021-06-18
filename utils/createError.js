exports.createError = (status, msg) => {
	const error = new Error(msg)
	error.statusCode = status
	throw error
}
