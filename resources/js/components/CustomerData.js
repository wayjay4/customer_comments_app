import React from 'react';

const CustomerData = ({customer}) => {
	return (
		<ol>
		    <li>{customer.id}</li>
		    <li>{customer.name}</li>
		    <li>{customer.address}</li>
		    <li>{customer.city}</li>
		    <li>{customer.state}</li>
		    <li>{customer.zipcode}</li>
		    <li>{customer.phone}</li>
		    <li>{customer.email}</li>
		</ol>
	);
};

export default CustomerData;
