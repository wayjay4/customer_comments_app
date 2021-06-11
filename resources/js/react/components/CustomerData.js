import React, { useState, useEffect } from 'react';
import CustomerNoteData from './CustomerNoteData';
import ModalForm from './ModalForm';
import ModalFormBtn from './ModalFormBtn';
import AddNoteForm from './AddNoteForm';

const CustomerData = (props) => {
	const [apiKey, setApiKey] = useState('ol4wvmDgAmn5X3sNBjhIJgDOTfUpbpdnS2Z18I5u');
	const [apiUrl, setApiUrl] = useState(location.origin+'/api/');
	const [formData, setFormData] = useState({});

	const handleInputChange = (el) => {
		formData[el.target.name] = el.target.value;
		setFormData(formData);
	};

	const handleSubmitForm = (el) => {
		let userID = props.appState.dataid;
		let customerID = props.customer.id;
		let thisUrl = apiUrl+"users/"+userID+"/customers/"+customerID+"/customernotes";
		let thisMethod = "POST";

		// make connection
		fetch(thisUrl, {
			"method": thisMethod,
			"headers": {
				"Authorization": "Bearer "+apiKey,
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Referer": location.origin,
			},
			"body": JSON.stringify(formData),
		})
		.then(response => response.json())
		.then(response => {
			console.log(response);
		})
		.catch(err => {
			console.log(err);
		});
	};

	const [modalData, setModalData] = useState({
        'modal_id': 'modalAddForm'+props.customer.id,
        'modalLabel': 'customerNoteModal',
        'btn_text': 'Add A Customer Note',
        'modal_title': 'Add a customer note on '+props.customer.name+':',
        'modal_body': <AddNoteForm appState={props.appState} customer={props.customer} handleInputChange={handleInputChange} />,
	});

	return (
		<div className="card customerdata-container">
			<div className="card-body">
				<h5 className="card-title">{props.customer.name}</h5>
				<p className="card-text">
					{props.customer.address}
					<br />
					{props.customer.city}, {props.customer.state} {props.customer.zipcode}
				</p>
				<p>
					{props.customer.phone}
					<br />
					{props.customer.email}
				</p>
				<p>
					<button className="btn btn-outline-info" type="button" data-toggle="collapse" data-target={'#collapse-notes-'+props.customer.id} aria-expanded="false" aria-controls={'collapse-notes-'+props.customer.id}>
						View Customer Notes
					</button>
				</p>
			</div>

			<div className="card-body">
				<div className="collapse" id={'collapse-notes-'+props.customer.id}>
					<div className="card card-body">
						<div className="modal-container">
							<ModalFormBtn className="add-note-btn" appState={props.appState} modalData={modalData} />
	                    	<ModalForm appState={props.appState} modalData={modalData} handleSubmitForm={handleSubmitForm} />
						</div>

	                    <div className="customernote-container">
	                        {
	                            props.customer.customernote.map(
	                                (customernote) => {
	                                    return (
	                                        <CustomerNoteData key={customernote.note_id} appState={props.appState} customernote={customernote} customer={props.customer} />
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
