import React from 'react';
import CustomerNoteData from './CustomerNoteData';

const CustomerData = ({customer}) => {
	return (
		<div className="container">
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{customer.name}</h5>
					<p className="card-text">{customer.address} <br /> {customer.city}, {customer.state} {customer.zipcode}</p>
				</div>

				<ul className="list-group list-group-flush">
					<li className="list-group-item">{customer.phone}</li>
					<li className="list-group-item">{customer.email}</li>
				</ul>

				<div className="card-body">
					<a href="#" className="card-link">Comments</a>
	                    <div>
	                        {
	                            customer.customernote.map(
	                                (customernote) => {
	                                    return (
	                                        <CustomerNoteData key={customernote.note_id} customernote={customernote} />
	                                    );
	                                }
	                            )
	                        }
	                    </div>
				</div>
			</div>
		</div>
	);
};

export default CustomerData;
