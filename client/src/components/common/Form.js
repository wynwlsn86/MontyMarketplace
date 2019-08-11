import React from 'react'

export const Form = ({ children, onChange, onSubmit }) => {
	return (
		<form onSubmit={(e) => onSubmit(e)} onChange={(e) => onChange(e)}>
			{children}
		</form>
	)
}
