import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import CustomerData from './CustomerData';
import './styles/customerboard.css';

function Customerboard() {
    //state vars
    const [apiKey, setApiKey] = useState('ol4wvmDgAmn5X3sNBjhIJgDOTfUpbpdnS2Z18I5u');
    const [apiUrl, setApiUrl] = useState(location.origin+'/api/');
    const [customerlist, setCustomerlist] = useState({});
    const [recievedlist, setRecievedlist] = useState(false);
    const dataid = document.getElementById('customerboard').getAttribute('data-id');

    // use effect
    useEffect(() => {
        if(!recievedlist){
            getCustomerlist();
        }
    });

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
        })
        .catch(err => {
            console.log(err);
            setRecievedlist(true);
        });
    };

    const handleSubmitForm = (el) => {
        let account = dataid;
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
                                                <CustomerData key={customer.id} customer={customer} dataid={dataid} handleSubmitForm={handleSubmitForm} />
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

export default Customerboard;

if (document.getElementById('customerboard')) {
    ReactDOM.render(<Customerboard />, document.getElementById('customerboard'));
}
