import React, {useState, useEffect} from 'react';
import ModalForm from './ModalForm';
import ModalFormBtn from './ModalFormBtn';
import EditNoteForm from './EditNoteForm';

const CustomerNoteData = (props) => {
	const isValidUser = (props.customernote.creator_id == props.appState.dataid);

	const [formData, setFormData] = useState({});

	const handleInputChange = (el) => {
		formData[el.target.name] = el.target.value;
		setFormData(formData);
	};

	const handleSubmitForm = (el) => {
		let userID = props.appState.dataid;
		let customerID = props.customer.id;
		let thisUrl = props.appState.apiUrl+"users/"+userID+"/customernotes/"+props.customernote.note_id;
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
			console.log(response);
		})
		.catch(err => {
			console.log(err);
		});
	};

	const [modalData, setModalData] = useState({
        'modal_id': 'modalEditForm'+props.customer.id,
        'modalLabel': 'customerNoteModal',
        'btn_text': 'Edit A Customer Note',
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
								isValidUser
								?
								<div>
									<button type="button" className="btn btn-outline-primary edit-note-btn">Edit</button>
									<button type="button" className="btn btn-outline-secondary edit-note-btn">Delete</button>

									<div className="modal-container">
										<ModalFormBtn className="add-note-btn" appState={props.appState} modalData={modalData} />
				                    	<ModalForm appState={props.appState} modalData={modalData} handleSubmitForm={handleSubmitForm} />
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
