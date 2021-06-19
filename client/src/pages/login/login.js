import { useState } from 'react'
import { Button } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import classes from './login.module.css'

function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const loginHandler = () => {}

	return (
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
					<Button onClick={() => {}}> Login </Button>
				</div>
			</div>
		</>
	)
}

export default LoginPage
