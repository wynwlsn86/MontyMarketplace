import React from 'react'
import { Tabs, Tab } from 'muicss/react'

const InventoryList = ({ renderInventory, handleSort }) => {
	return (
		<div className="inventory-item-container">
			<Tabs
				className="inventory-header"
				justified={true}
				onChange={(i, value, tab) => handleSort(value)}>
				<Tab value="name" label="Name" />
				<Tab value="brand" label="Brand" />
				<Tab value="quantity" label="Quantity" />
			</Tabs>
			{renderInventory()}
		</div>
	)
}

export default InventoryList
