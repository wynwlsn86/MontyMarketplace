import React from 'react'


export const Container = ({ classname, children }) => {
	return <div className={`container ${classname}`}>{children}</div>
}
