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
			displayErrorMessage('note', 'A valid \'note\' must contain at least five(5) characters.');
			return false;
		}

		return true;
	};

	// use this function to prevent cross site scripting and db injections
	// laravel framework already provides protection against this on the backend
	const escapeForm = (item, index, arr) => {
		arr[index] = encodeURI(item);
	};

	const displayErrorMessage = (item, msg) => {
		let eMessage = "Please provide a valid '"+item+"' value. "+msg;
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
		<table className="table table-borderless">
		    <thead hidden>
		        <tr>
		            <th colSpan="1" scope="col">Name</th>
		            <th colSpan="1" scope="col">Address</th>
		            <th colSpan="1" scope="col">Email</th>
		            <th colSpan="1" scope="col">Phone</th>
		            <th colSpan="1" scope="col">**</th>
		        </tr>
		    </thead>
		    <tbody>
		        <tr key={props.customer.id}>
					<th colSpan="1" scope="row">{props.customer.name}</th>
					<td colSpan="1">
						{props.customer.address}
						<br />
						{props.customer.city}, {props.customer.state} {props.customer.zipcode}			
					</td>
					<td colSpan="1">{props.customer.email}</td>
					<td colSpan="1">{props.customer.phone}</td>
					<td colSpan="1">
						<button className="btn btn-outline-info btn-sm" type="button" data-toggle="collapse" data-target={'#collapse-notes-'+props.customer.id} aria-expanded="false" aria-controls={'collapse-notes-'+props.customer.id}>
							View Customer Notes
						</button>
					</td>
        		</tr>

        		<tr>
        			<td colSpan="5">
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
        			</td>
        		</tr>
            </tbody>
        </table>
   	);
};

export default CustomerData;
