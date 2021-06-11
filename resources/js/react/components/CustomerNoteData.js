import React from 'react';

const CustomerNoteData = ({appState, customernote, customerID}) => {
	const isValid = (customernote.creator_id == appState.dataid);

	return (
		<div className="card">
			<div className="card-body">
				<ul>
					<li key={customernote.note_id}>
						Comment: {customernote.note}
						<br />
						Author: {customernote.creator_name}

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
			</div>
		</div>
	);
};

export default CustomerNoteData;
