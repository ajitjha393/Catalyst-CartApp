import { useState } from 'react'
import { Button } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import classes from './login.module.css'

import { connect } from 'react-redux'
import Spinner from '../../components/ui/spinner'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function LoginPage({ setAuthToken }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const history = useHistory()

	const loginHandler = () => {
		// Added basic validation
		const loginData = {
			email: email.trim(),
			password: password.trim(),
		}
		for (let [k, v] of Object.entries(loginData)) {
			if (v === '') {
				alert(`Incorrect ${k} provided ...`)
				return
			}
		}

		console.log(loginData)
		setLoading(true)

		// axios request for login
		axios
			.post(`${process.env.REACT_APP_API_URL}/auth/login`, loginData)
			.then(({ data }) => {
				console.log(data)
				const { token, userId, fullName, email } = data
				setLoading(false)
				setAuthToken({ token, userId, fullName, email })
				history.push('/catalogue')
			})
			.catch((err) => {
				setLoading(false)
				console.log(err)
			})
	}

	return loading ? (
		<Spinner />
	) : (
		<>
			<h2 className={classes.header}>User Login!</h2>
			<div className={classes.form}>
				<FormControl label="Email">
					<Input
						id="input-id"
						value={email}
						onChange={(event) =>
							setEmail(event.currentTarget.value)
						}
					/>
				</FormControl>
				<FormControl label="Password">
					<Input
						id="input-id"
						value={password}
						onChange={(event) =>
							setPassword(event.currentTarget.value)
						}
						type="password"
					/>
				</FormControl>

				<div className={classes.actions}>
					<Button onClick={loginHandler}> Login </Button>
				</div>
			</div>
		</>
	)
}

const mapDispatch = (dispatch) => ({
	setAuthToken: (authPayload) => dispatch.user.setAuthToken(authPayload),
})

export default connect(null, mapDispatch)(LoginPage)
