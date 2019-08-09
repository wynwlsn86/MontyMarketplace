import React from 'react'

import "../../styles/Products.css";

export const Container = ({ classname, children }) => {
	return <div className={`container ${classname}`}>{children}</div>
}
