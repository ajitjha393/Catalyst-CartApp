/** @args listing : Product[]
 *  @op product grouped by user
 */
export function filterListingByUser(listings) {
	let userSet = new Set()
	listings.forEach((prod) => userSet.add(prod.userId._id))
	let filteredListing = []

	for (const id of userSet) {
		filteredListing.push({
			[id]: listings.filter((p) => p.userId._id === id),
		})
	}

	return filteredListing
}

export function createNewAuthStateObj(auth, val) {
	if (auth) {
		return {
			authenticated: true,
			...val,
		}
	}
	return {
		authenticated: false,
		token: null,
		userId: null,
		fullName: null,
		email: null,
	}
}
