import React from 'react';
import CustomerNoteData from './CustomerNoteData';

const CustomerData = ({customer, dataid, handleSubmitForm}) => {
	return (
		<div className="card customerdata-container">
			<div className="card-body">
				<h5 className="card-title">{customer.name}</h5>
				<p className="card-text">{customer.address} <br /> {customer.city}, {customer.state} {customer.zipcode}</p>
				<p>{customer.phone} <br /> {customer.email}</p>
				<p>
					<button className="btn btn-outline-info" type="button" data-toggle="collapse" data-target={'#collapse-notes-'+customer.id} aria-expanded="false" aria-controls={'collapse-notes-'+customer.id}>
						View Customer Notes
					</button>
				</p>
			</div>

			<div className="card-body">
				<div className="collapse" id={'collapse-notes-'+customer.id}>
					<div className="card card-body">
						<div>
							<button type="button" className="btn btn-outline-primary edit-note-btn" data-toggle="modal" data-target="#exampleModal" data-customerid={customer.id}>Add A Customer Note</button>
						</div>

	                    <div>
	                        {
	                            customer.customernote.map(
	                                (customernote) => {
	                                    return (
	                                        <CustomerNoteData key={customernote.note_id} customernote={customernote} customerID={customer.id} dataid={dataid} handleSubmitForm={handleSubmitForm} />
	                                    );
	                                }
	                            )
	                        }
	                    </div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomerData;
