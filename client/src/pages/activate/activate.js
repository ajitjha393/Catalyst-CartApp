import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Spinner from '../../components/ui/spinner'

function Activate() {
	const { token } = useParams()
	const history = useHistory()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		const body = {
			activateToken: token,
		}
		axios
			.post(`${process.env.REACT_APP_API_URL}/auth/activate`, body)
			.then(({ data }) => {
				console.log(data)
				setLoading(false)
				history.push('/login')
			})
			.catch((err) => {
				setLoading(false)
				alert('Token expired please register again...')
				setLoading(false)
				history.push('/signup')
			})
	}, [token])

	return loading ? <Spinner /> : <div></div>
}

export default Activate
