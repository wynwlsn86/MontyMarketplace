import React from 'react'
import { Tabs, Tab } from 'muicss/react'

const InventoryList = ({ renderInventory, handleSort }) => {
	return (
		<div className="inventory-item-container">
			<Tabs
				className="inventory-header"
				justified={true}
				onChange={(i, value, tab) => handleSort(value)}>
				<Tab
					value="name"
					label="Name"
					onActive={(i, value, tab) => handleSort(value)}
				/>
				<Tab
					value="brand"
					label="Brand"
					onActive={(i, value, tab) => handleSort(value)}
				/>
				<Tab
					value="quantity"
					label="Quantity"
					onActive={(i, value, tab) => handleSort(value)}
				/>
				<Tab value="manage" label="Manage" />
			</Tabs>
			{renderInventory()}
		</div>
	)
}

export default InventoryList
