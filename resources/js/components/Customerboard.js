import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import CustomerData from './CustomerData';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
console.log(API_KEY);

function Customerboard() {
    //state vars
    const [customerlist, setCustomerlist] = useState({});
    const [recievedlist, setRecievedlist] = useState(false);


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


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card">
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
                                            //console.log(customer);
                                            return (
                                                <CustomerData key={customer.id} customer={customer} />
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
