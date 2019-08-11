import React from 'react'
import { Input, Textarea } from 'muicss/react'

export const FormInput = ({ name, value, placeholder, label, textarea }) => {
	switch (textarea) {
		case true:
			return (
				<Textarea
					floatingLabel={true}
					placeholder={placeholder}
					label={label}
					defaultValue={value}
				/>
			)
		default:
			return (
				<Input
					floatingLabel={true}
					placeholder={placeholder}
					label={label}
					defaultValue={value}
					name={name}
				/>
			)
	}
}
