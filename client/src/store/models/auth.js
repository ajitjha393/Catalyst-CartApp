import { setWithExpiry, getWithExpiry } from '../../utils/storage'

export const user = {
	state: {
		authenticated: false,
		token: null,
		userId: null,
	},
	reducers: {
		setAuthToken(state, { token, userId }) {
			let val = getWithExpiry('AuthToken')
			if (!val) {
				setWithExpiry('AuthToken', { token, userId }, 20000)
				val = { token, userId }
			}

			return {
				...state,
				authenticated: true,
				token: val.token,
				userId: val.userId,
			}
		},

		verifyExistingToken(state, payload) {
			let val = getWithExpiry('AuthToken')
			if (!val) {
				return {
					...state,
					authenticated: false,
					token: null,
					userId: null,
				}
			}
			return {
				...state,
				authenticated: true,
				token: val.token,
				userId: val.userId,
			}
		},

		logout(state, payload) {
			localStorage.removeItem('AuthToken')
			return {
				...state,
				authenticated: false,
				token: null,
				userId: null,
			}
		},
	},
}
