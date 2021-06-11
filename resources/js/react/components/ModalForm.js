import React, { useState, useEffect, Component } from 'react';

const ModalForm = (props) => {

	return (
		<div className="container modalform_ctnr">
			<div className="modal fade" id={props.modalData.modal_id} tabIndex="-1" aria-labelledby={props.modalData.modalLabel} aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id={props.modalData.modalLabel}>{props.modalData.modal_title}</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							{props.modalData.modal_body}
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary" onClick={props.handleSubmitForm}>Save Note</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};

export default ModalForm;
