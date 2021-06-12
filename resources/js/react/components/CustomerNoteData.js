import React, {useState, useEffect} from 'react';
import ModalForm from './ModalForm';
import ModalFormBtn from './ModalFormBtn';
import EditNoteForm from './EditNoteForm';

const CustomerNoteData = (props) => {
	const [formData, setFormData] = useState({});
	const [formTargets, setFormTargets] = useState({});

	// validate if user is creator of customer note
	const isValidUser = (props.customernote.creator_id == props.appState.dataid);

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
		$(formTargets.customer_note).val(props.customernote.note);
	};

	// the user submitted a update request to the db
	const handleSubmitForm = (el) => {
		let thisUrl = props.appState.apiUrl+"users/"+props.appState.dataid+"/customernotes/"+props.customernote.note_id;
		let thisMethod = "PUT";

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
		})
		.catch(err => {
			console.log(err);
		});
		
		$('#'+modalData.modal_id).modal('hide');
	};

	// the user submitted a delete request to the db
	const handleDeleteForm = (el) => {
		// confirm deletion with user
		let confirmDelete = confirm('Are you sure you want to delete the customer note?');

		if(confirmDelete){
			let thisUrl = props.appState.apiUrl+"users/"+props.appState.dataid+"/customernotes/"+props.customernote.note_id;
			let thisMethod = "DELETE";

			// make connection
			fetch(thisUrl, {
				"method": thisMethod,
				"headers": {
					"Authorization": "Bearer "+props.appState.apiKey,
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Referer": location.origin,
				},
			})
			.then(response => response.json())
			.then(response => {
				props.appState.handleNoteUpdate(response);
			})
			.catch(err => {
				console.log(err);
			});

			$('#'+modalData.modal_id).modal('hide');
		}

		return confirmDelete;
	};

	// set the modal values for editing customer data
	const [modalData, setModalData] = useState({
        'modal_id': 'modalEditForm'+props.customernote.note_id,
        'modalLabel': 'customerNoteModal',
        'btn_text': 'Edit',
        'modal_title': 'Edit a customer note on '+props.customer.name+':',
        'modal_body': <EditNoteForm appState={props.appState} customer={props.customer} customernote={props.customernote} handleInputChange={handleInputChange} />,
	});

	return (
		<div className="card">
			<div className="card-body">
				<ul>
					<li key={props.customernote.note_id}>
						Comment: {props.customernote.note}
						<br />
						Author: {props.customernote.creator_name}

						<div>

							{
								// if user is creator of note then show 'edit' and 'delete' options for customer note
								isValidUser
								?
								<div>
									<div className="modal-container">
										
										<button type="button" className="btn btn-outline-danger edit-note-btn" onClick={handleDeleteForm}>Delete</button>
										<ModalFormBtn className="add-note-btn" appState={props.appState} modalData={modalData} />
				                    	<ModalForm appState={props.appState} modalData={modalData} handleSubmitForm={handleSubmitForm} handleCancelBtnClick={handleCancelBtnClick} />
									</div>
								</div>
								:
								<div>
								&nbsp;
								</div>
							}
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default CustomerNoteData;
