import { setWithExpiry, getWithExpiry } from '../../utils/storage'
import { createNewAuthStateObj } from '../../utils/helpers'

export const user = {
	state: {
		authenticated: false,
		token: null,
		userId: null,
		fullName: null,
		email: null,
	},
	reducers: {
		setAuthToken(state, { token, userId }) {
			let val = getWithExpiry('AuthToken')
			if (!val) {
				val = { token, userId, fullName, email }
				setWithExpiry('AuthToken', val, 20000)
			}

			return createNewAuthStateObj(true, val)
		},

		verifyExistingToken(state, payload) {
			let val = getWithExpiry('AuthToken')
			if (!val) {
				return createNewAuthStateObj(false)
			}
			return createNewAuthStateObj(true, val)
		},

		logout(state, payload) {
			localStorage.removeItem('AuthToken')
			return createNewAuthStateObj(false)
		},
	},
}
