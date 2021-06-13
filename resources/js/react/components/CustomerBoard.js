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
    const [sortNameToggle, setSortNameToggle] = useState(true);

    // use effect
    useEffect(() => {
        window.onload = function() {
            appState.apiKey = apiKey,
            appState.apiUrl = apiUrl,
            appState.dataid = document.getElementById('customerboard').getAttribute('data_id');
            appState.getCustomerlist = getCustomerlist;
            appState.handleSubmitForm = handleSubmitForm;
            appState.validateFormFields = validateFormFields;
            appState.displayErrorMessage = displayErrorMessage;
            appState.customerlist = customerlist;
            appState.handleNoteUpdate = handleNoteUpdate;

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

    const handleNoteUpdate = (response) => {    
        getCustomerlist();
    };

    const nameButtonClickHandler = (el) => {
        sortList();
    };

    const sortList = () => {
        let byName = customerlist.slice(0);

        // sort name by ascending function
        let sortByNameAsc = (a,b) => {
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        };

        // sort name by descending function
        let sortByNameDesc = (b,a) => {
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        };

        // sort customer list by name while toggling between 'asc' and 'desc'
        if(sortNameToggle){
            byName.sort(sortByNameAsc);
        }
        else{
            byName.sort(sortByNameDesc);
        }
        setSortNameToggle(!sortNameToggle);

        // re-set customerlist with sorted data
        setCustomerlist(byName);

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
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th colSpan="1" scope="col">#</th>
                                            <th colSpan="1" scope="col"><button type="button" onClick={nameButtonClickHandler} style={{'fontWeight': 'bold',}}>Name</button></th>
                                            <th colSpan="1" scope="col">Address</th>
                                            <th colSpan="1" scope="col">Email</th>
                                            <th colSpan="1" scope="col">Phone</th>
                                            <th colSpan="1" scope="col">**</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            customerlist.map(
                                                (customer) => {
                                                    return (
                                                        <tr key={customer.id} >
                                                            <th colSpan="1">
                                                                {customer.id}
                                                            </th>
                                                            <td colSpan="5">
                                                                <CustomerData key={customer.id} appState={appState} customer={customer} />
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )
                                        }
                                    </tbody>
                                </table>
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
