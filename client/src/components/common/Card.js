import React from 'react'
import { Panel } from 'muicss/react'

export const Card = ({ className, children, title }) => {
	return (
		<Panel className={`card ${className}`}>
			<h3>{title}</h3>
			{children}
		</Panel>
	)
}
