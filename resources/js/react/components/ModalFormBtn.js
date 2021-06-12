import React from 'react';

const ModalFormBtn = (props) => {
	return (
		<div>
			<button 
				type="button" 
				className={"btn btn-outline-primary "+props.className} 
				data-toggle="modal" 
				data-target={"#"+props.modalData.modal_id}
			>
				{props.modalData.btn_text}
			</button>
		</div>
	);
};

export default ModalFormBtn;
