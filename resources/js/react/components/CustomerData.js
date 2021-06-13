import React, { useState, useEffect } from 'react';
import CustomerNoteData from './CustomerNoteData';
import ModalForm from './ModalForm';
import ModalFormBtn from './ModalFormBtn';
import AddNoteForm from './AddNoteForm';

const CustomerData = (props) => {
	const [formData, setFormData] = useState({});
	const [formTargets, setFormTargets] = useState({});

	// the user made a change to the form field
	const handleInputChange = (el) => {
		// save changes to textfield in formData
		formData[el.target.name] = el.target.value;
		setFormData(formData);

		// save the target textfield in case we need to access it again
		formTargets[el.target.name] = el.target;
		setFormTargets(formTargets);
	};

	// the user cancelled editting
	const handleCancelBtnClick = (el) => {
		resetEditorForm();
	};

	const resetEditorForm = () => {
		// reset formData to empty
		setFormData({});
		
		// reset textfield to original values
		$(formTargets.customer_note).val('');
	};

	const handleSubmitForm = (el) => {
		if(validateForm()){
			let userID = props.appState.dataid;
			let customerID = props.customer.id;
			let thisUrl = props.appState.apiUrl+"users/"+userID+"/customers/"+customerID+"/customernotes";
			let thisMethod = "POST";

			// make connection
			fetch(thisUrl, {
				"method": thisMethod,
				"headers": {
					"Authorization": "Bearer "+props.appState.apiKey,
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Referer": location.origin,
				},
				"body": JSON.stringify(formData),
			})
			.then(response => response.json())
			.then(response => {
				props.appState.handleNoteUpdate(response);
				resetEditorForm();
			})
			.catch(err => {
				console.log(err);
			});

			$('#'+modalData.modal_id).modal('hide');
		}
	};

	// add any required form validations here
	const validateForm = () => {
		// validate the customer_note form field
		if((typeof formData['customer_note'] === 'undefined') || (formData['customer_note'].length < 5)){
			displayErrorMessage('Please provide a valid \'note\' with at least five(5) characters.');
			return false;
		}

		return true;
	};

	// use this function to prevent cross site scripting and db injections
	// laravel framework already provides protection against this on the backend
	const escapeForm = (item, index, arr) => {
		arr[index] = encodeURI(item);
	};

	const displayErrorMessage = (msg) => {
		let eMessage = "Please provide a valid '"+msg+"' value. ";
		alert(eMessage);
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
	                    	<ModalForm appState={props.appState} modalData={modalData} handleSubmitForm={handleSubmitForm} handleCancelBtnClick={handleCancelBtnClick} />
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
