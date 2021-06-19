import { filterListingByUser } from '../../utils/helpers'

export const product = {
	state: [],
	reducers: {
		setListings(state, payload) {
			return filterListingByUser(payload)
		},
	},
}
