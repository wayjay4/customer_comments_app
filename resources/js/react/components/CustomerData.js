import React, { useState, useEffect } from 'react';
import CustomerNoteData from './CustomerNoteData';
import ModalForm from './ModalForm';
import ModalFormBtn from './ModalFormBtn';

const CustomerData = ({appState, customer, noteContents}) => {
	const [modalData, setModalData] = useState({
        'modal_id': 'modalForm',
        'modalLabel': 'customerNoteModal',
        'btn_text': 'Add A Customer Note',
        'modal_title': 'Customer Comment:',
        'modal_body': (<form>
	                        <div className="form-group">
	                            <label htmlFor="recipient-name" className="col-form-label">Customer Name:</label>
	                            <input type="text" className="form-control" id="recipient-name" />
	                        </div>
	                        <div className="form-group">
	                            <label htmlFor="message-text" className="col-form-label">Note:</label>
	                            <textarea className="form-control" id="message-text"></textarea>
	                        </div>
	                    </form>),
	});

	return (
		<div className="card customerdata-container">
			<div className="card-body">
				<h5 className="card-title">{customer.name}</h5>
				<p className="card-text">
					{customer.address}
					<br /> 
					{customer.city}, {customer.state} {customer.zipcode}
				</p>
				<p>
					{customer.phone}
					<br />
					{customer.email}
				</p>
				<p>
					<button className="btn btn-outline-info" type="button" data-toggle="collapse" data-target={'#collapse-notes-'+customer.id} aria-expanded="false" aria-controls={'collapse-notes-'+customer.id}>
						View Customer Notes
					</button>
				</p>
			</div>

			<div className="card-body">
				<div className="collapse" id={'collapse-notes-'+customer.id}>
					<div className="card card-body">
						<div className="modal-container">
							<ModalFormBtn className="add-note-btn" appState={appState} modalData={modalData} />
	                    	<ModalForm appState={appState} modalData={modalData} />
						</div>

	                    <div className="customernote-container">
	                        {
	                            customer.customernote.map(
	                                (customernote) => {
	                                    return (
	                                        <CustomerNoteData key={customernote.note_id} appState={appState} customernote={customernote} customerID={customer.id} noteContents={noteContents} />
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
