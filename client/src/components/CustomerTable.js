import React from 'react'

const CustomerTable = ({ customers }) => {
	const renderCustomers = () => {
		if (customers) {
			return customers.map((customer) => {
				return (
					<div className="customer-inline" key={customer._id}>
						<h3>{customer.name.first}</h3>
						<h3>{customer.name.last}</h3>
						<h3>{customer.email}</h3>
					</div>
				)
			})
		} else return <h3>No Customers</h3>
	}
	return (
		<div className="customer-container">
			<div className="customer-inline-header">
				<h3>First Name</h3>
				<h3>Last Name</h3>
				<h3>Email</h3>
			</div>
			{renderCustomers()}
		</div>
	)
}

export default CustomerTable
