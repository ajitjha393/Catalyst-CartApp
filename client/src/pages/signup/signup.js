import { useState } from 'react'
import { Button } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import classes from '../login/login.module.css'

import Spinner from '../../components/ui/spinner'
import axios from 'axios'

function SignUpPage() {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const signUpHandler = () => {
		// Added basic validation
		const signupData = {
			firstName: firstName.trim(),
			lastName: lastName.trim(),
			email: email.trim(),
			password: password.trim(),
		}
		for (let [k, v] of Object.entries(signupData)) {
			if (v === '') {
				alert(`Incorrect ${k} provided ...`)
				return
			}
			if (k === 'password' && v !== confirmPassword) {
				alert('Passwords do not match...')
				return
			}
		}
		console.log(signupData)
		setLoading(true)

		// axios request for login
		axios
			.post(`${process.env.REACT_APP_API_URL}/auth/register`, signupData)
			.then(({ data }) => {
				console.log(data)
				setLoading(false)
				alert('Check your mail to verify your account!')
			})
			.catch((err) => {
				setLoading(false)
				console.log(err)
				alert('Something went wromg try again...')
			})

		// axios request for signup
	}

	return loading ? (
		<Spinner />
	) : (
		<>
			<h2 className={classes.header}>User Registeration !</h2>
			<div className={classes.form}>
				<FormControl label="First Name">
					<Input
						id="input-id"
						value={firstName}
						onChange={(event) =>
							setFirstName(event.currentTarget.value)
						}
					/>
				</FormControl>
				<FormControl label="Last Name">
					<Input
						id="input-id"
						value={lastName}
						onChange={(event) =>
							setLastName(event.currentTarget.value)
						}
					/>
				</FormControl>
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
				<FormControl label="Confirm Password">
					<Input
						id="input-id"
						value={confirmPassword}
						onChange={(event) =>
							setConfirmPassword(event.currentTarget.value)
						}
						type="password"
					/>
				</FormControl>

				<div className={classes.actions}>
					<Button onClick={signUpHandler}> Sign Up </Button>
				</div>
			</div>
		</>
	)
}

export default SignUpPage
