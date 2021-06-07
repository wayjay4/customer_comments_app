import React from 'react';

const CustomerNoteData = ({customernote, customerID, dataid, handleSubmitForm}) => {
	const isValid = (customernote.creator_id == dataid);

	return (
		<div className="card">
			<div className="card-body">
				<ul>
					<li key={customernote.note_id}>
						Comment: {customernote.note}
						<br />
						Author: {customernote.note_creator}

						<div>
							
							{
								isValid
								?
								<div>
									<button type="button" className="btn btn-outline-primary edit-note-btn">Edit</button>
									<button type="button" className="btn btn-outline-secondary edit-note-btn">Delete</button>
								</div>
								:
								<div>
								&nbsp;
								</div>
							}
						</div>
					</li>
				</ul>

				<div>
					<div>
						<button type="button" className="btn btn-outline-primary edit-note-btn" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Edit</button>
						<button type="button" className="btn btn-outline-secondary edit-note-btn" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">Delete</button>
					</div>
					
					<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div className="modal-dialog">
					    <div className="modal-content">
					      <div className="modal-header">
					        <h5 className="modal-title" id="exampleModalLabel">New customer note</h5>
					        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
					      </div>
					      <div className="modal-body">
					        <form>
					          <div className="form-group">
					            <label htmlFor="message-text" className="col-form-label">Note:</label>
					            <textarea className="form-control" id="customer-note"></textarea>
					          </div>
					        </form>
					      </div>
					      <div className="modal-footer">
					        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
					        <button type="button" className="btn btn-primary" onClick={handleSubmitForm}>Save</button>
					      </div>
					    </div>
					  </div>
					</div>
				</div>


			</div>
		</div>
	);
};

export default CustomerNoteData;
