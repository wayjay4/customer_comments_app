import React, {useState, useEffect} from 'react';

const AddNoteForm = (props) => {
	return (
		<div className="add_note_form">
			<form>
                <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label">Note:</label>
                    <textarea className="form-control" name="customer_note" onChange={props.handleInputChange}></textarea>
                </div>
            </form>
		</div>
	);
};

export default AddNoteForm;
