const sgMail = require('@sendgrid/mail')

const sendEmail = ({ recipient, msgBody }) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY)

	const msg = {
		to: recipient,
		from: process.env.EMAIL_FROM,
		subject: 'Verifying your Email',
		html: msgBody,
	}

	// console.log(msg);

	sgMail
		.send(msg)
		.then((response) => {
			console.log(response)

			console.log('Email Sent')
		})
		.catch((error) => {
			console.error(error)
		})
}

module.exports = sendEmail
