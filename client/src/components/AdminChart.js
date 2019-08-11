import React from 'react'
import { Chart } from 'react-google-charts'

export const AdminChart = () => {
	const data = [
		['Task', 'Hours per Day'],
		['Work', 11],
		['Eat', 2] // CSS-style declaration
	]
	const pieChart = (
		<Chart
			chartType="PieChart"
			data={data}
			options={{
				pieSliceText: 'label',
				backgroundColor: '#e0f7fa',
				pieHole: 0.4,
				slices: {
					1: { offset: 0.2 },
					2: { offset: 0.3 }
				}
			}}
		/>
	)
	return <div>{pieChart}</div>
}
