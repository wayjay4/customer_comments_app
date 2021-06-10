import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import CustomerData from './CustomerData';

function CustomerBoard() {
    //state vars
    const [appState, setAppState] = useState({});
    const [apiKey, setApiKey] = useState('ol4wvmDgAmn5X3sNBjhIJgDOTfUpbpdnS2Z18I5u');
    const [apiUrl, setApiUrl] = useState(location.origin+'/api/');
    const [customerlist, setCustomerlist] = useState({});
    const [recievedlist, setRecievedlist] = useState(false);
    const [noteContents, setNoteContents] = useState('');

    // use effect
    useEffect(() => {
        window.onload = function() {
            appState.dataid = document.getElementById('customerboard').getAttribute('data_id');
            appState.getCustomerlist = getCustomerlist;
            appState.onNoteChange = onNoteChange;
            appState.handleSubmitForm = handleSubmitForm;
            appState.validateFormFields = validateFormFields;
            appState.displayErrorMessage = displayErrorMessage;
            appState.customerlist = customerlist;
            appState.noteContents = noteContents;
            appState.setNoteContents = setNoteContents;
            appState.handleModalBtnClick = handleModalBtnClick;

            setAppState(appState);

            getCustomerlist();
        }
    }, []);

    const getCustomerlist = () => {
        // create api connection and send request
        fetch(apiUrl+'customers', {
            'method': 'GET',
            'headers': {
                'Authorization': 'Bearer '+apiKey,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Referer': location.origin,
            }
        })
        .then(response => response.json())
        .then(response => {
            setCustomerlist(response);
            setRecievedlist(true);
            console.log(response);
        })
        .catch(err => {
            console.log(err);
            setRecievedlist(true);
        });
    };

    const onNoteChange = (el) => {
        let targetVal = el.target.value;
        setNoteContents(targetVal);
        console.log('targetVal: ');
        console.log(noteContents);
    };

    const handleSubmitForm = (el) => {
        let account = appState.dataid;
        let customerID = 1;

        //let formValues['note'] = $("#customer-note").val();

        document.getElementById('customer-note').getAttribute('value');

        return console.log($("#customer-note").getAttribute('innerHTML'));

        if(validateFormFields()){
            let thisUrl = "";
            let thisMethod = "";

            // if no timesheet_id, then add a timesheet record
            // else, edit an existing timesheet record
            if(timesheetData.timesheet_id <=0){
                thisUrl = apiUrl+"users/"+account+"/customers/"+customerID+"/customernotes";
                thisMethod = "POST";
            }
            else{
                thisUrl = apiUrl+"accounts/"+account+"/timesheets/"+timesheetData.timesheet_id;
                thisMethod = "PUT";
            }

            // make connection
            fetch(thisUrl, {
                "method": thisMethod,
                "headers": {
                    "Authorization": "Bearer "+apiKey,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Referer": location.origin,
                },
                "body": JSON.stringify(formValues),
            })
            .then(response => response.json())
            .then(response => {
                getTimesheets();
                $('#addTimeModal').modal('hide');

                setFormValues({});
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    const validateFormFields = () => {
        if(formValues["note"].length < 1){
            displayErrorMessage("note");
            return false;
        }

        return true;
    };

    const displayErrorMessage = (msg) => {
        let theMessage = "Please provide a valid '"+msg+"' value."
        alert(theMessage);
    };

    const handleModalBtnClick = (el) => {
        console.log('ModalForm btn-click, target element: ');
        console.log(el);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card customerboard-container">
                        <div className="card-header">Customerboard Component</div>
                        {
                            !recievedlist
                            ?
                            <div>
                                There are no customer records to display.
                            </div>
                            :
                            <div>
                                {
                                    customerlist.map(
                                        (customer) => {
                                            return (
                                                <CustomerData key={customer.id} appState={appState} customer={customer} noteContents={noteContents} />
                                            );
                                        }
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerBoard;

if (document.getElementById('customerboard')) {
    ReactDOM.render(<CustomerBoard />, document.getElementById('customerboard'));
}
