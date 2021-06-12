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

	const [modalData, setModalData] = useState({
        'modal_id': 'modalEditForm'+props.customer.id,
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
								isValidUser
								?
								<div>
									<div className="modal-container">
										
										<button type="button" className="btn btn-outline-danger edit-note-btn" onClick={handleDeleteForm}>Delete</button>
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
