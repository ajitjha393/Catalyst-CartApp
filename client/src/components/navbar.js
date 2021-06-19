import * as React from 'react'
import { AppNavBar, setItemActive } from 'baseui/app-nav-bar'
import { ChevronDown, Delete, Overflow, Upload } from 'baseui/icon'

export default () => {
	const [mainItems, setMainItems] = React.useState([
		{ icon: Upload, label: 'Catalogue' },
		{
			active: true,
			icon: ChevronDown,
			label: 'Admin Products',
			navExitIcon: Delete,
		},
	])
	return (
		<AppNavBar
			title="Catalyst App"
			mainItems={mainItems}
			onMainItemSelect={(item) => {
				setMainItems((prev) => setItemActive(prev, item))
			}}
			username="Bishwajit Jha"
			usernameSubtitle="ajitjha393@gmail.com"
			userItems={[{ icon: Overflow, label: 'Logout' }]}
			onUserItemSelect={(item) => console.log(item)}
		/>
	)
}
