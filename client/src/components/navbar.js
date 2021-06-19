import * as React from 'react'
import { AppNavBar, setItemActive } from 'baseui/app-nav-bar'
import { ArrowRight, ChevronDown, Delete, Overflow, Upload } from 'baseui/icon'
import { useHistory } from 'react-router-dom'

export default () => {
	const history = useHistory()
	const [mainItems, setMainItems] = React.useState([
		{ icon: ArrowRight, label: 'Catalogue', active: true },
		{ icon: ArrowRight, label: 'Add Product' },
		{
			icon: ArrowRight,
			label: 'Admin Products',
			navExitIcon: Delete,
		},
		{
			icon: ArrowRight,
			label: 'Login',
			navExitIcon: Delete,
		},
	])
	return (
		<AppNavBar
			title="Catalyst App"
			mainItems={mainItems}
			onMainItemSelect={(item) => {
				setMainItems((prev) => setItemActive(prev, item))
				switch (item.label) {
					case 'Admin Products': {
						history.push({
							pathname: '/catalogue/60cc78ee041ad9f592275026',
							search: '?edit=true',
						})
						break
					}
					case 'Catalogue': {
						history.push('/catalogue')
						break
					}

					case 'Add Product': {
						history.push('/new-product')
						break
					}

					case 'Login': {
						history.push('/login')
						break
					}
				}
			}}
			username="Bishwajit Jha"
			usernameSubtitle="ajitjha393@gmail.com"
			userItems={[{ icon: Overflow, label: 'Logout' }]}
			onUserItemSelect={(item) => console.log(item)}
		/>
	)
}
