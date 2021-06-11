import React, { useState, useEffect } from 'react';

const EditNoteForm = (props) => {
	return (
		<div className="edit_note_form">
			<form>
				<div className="form-group">
					<label htmlFor="message-text" className="col-form-label">Note:</label>
                    <textarea className="form-control" name="customer_note" defaultValue={props.customernote.note} onChange={props.handleInputChange}></textarea>
				</div>
			</form>
		</div>
	);
};

export default EditNoteForm;
