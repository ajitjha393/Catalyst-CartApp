import { init } from '@rematch/core'
import { product } from './models/product'

const models = {
	product,
}
const store = init({ models })

export default store
