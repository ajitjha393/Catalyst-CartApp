import { init } from '@rematch/core'
import { product } from './models/product'
import { user } from './models/auth'

const models = {
	product,
	user,
}
const store = init({ models })

export default store
