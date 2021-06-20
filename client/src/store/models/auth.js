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
		setAuthToken(state, authPayload) {
			let val = getWithExpiry('AuthToken')
			if (!val) {
				val = authPayload
				setWithExpiry('AuthToken', val, 60 * 1000)
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
