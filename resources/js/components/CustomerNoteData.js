import React from 'react';

const CustomerNoteData = ({customernote}) => {
	return (
		<div className="card">
			<div className="card-body">
				<ul>
					<li key={customernote.note_id}>
						Comment: {customernote.note}
						<br />
						Author: {customernote.note_creator}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default CustomerNoteData;
