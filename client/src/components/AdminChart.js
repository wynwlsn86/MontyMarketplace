import React from 'react'
import { Chart } from 'react-google-charts'

export const AdminChart = ({ orders }) => {
	const fullFilled = orders.filter((order) => order.isFulfilled === true)
	const notfullFilled = orders.filter((order) => order.isFulfilled === false)
	const data = [
		['Orders Fulfilled', ' Orders Not Fulfilled'],
		[' Orders Fulfilled', fullFilled.length],
		['Orders Not Fulfilled', notfullFilled.length] // CSS-style declaration
	]
	const pieChart = (
		<Chart
			chartType="PieChart"
			data={data}
			options={{
				backgroundColor: '#e0f7fa',
				pieHole: 0.2,
				slices: {
					1: { offset: 0.1 },
					2: { offset: 0.2 }
				}
			}}
		/>
	)
	return <div>{pieChart}</div>
}
