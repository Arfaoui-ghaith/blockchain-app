import React, { useState, useEffect } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default function ConductTransaction() {
    const API_BASE_URL = 'http://localhost:5000';
    const [amount, setAmount] = useState(0);
    const [recipient, setRecipient] = useState('');
    const [knownAddresses, setKnownAddresses] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/known-addresses`)
        .then(res => res.json())
        .then(json => setKnownAddresses(json));
    }, []);


    const updateRecipient = (e) => {
        setRecipient(e.target.value);
    }

    const updateAmount = (e) => {
        setAmount(Number(e.target.value));
    }

    const submitTransaction = (e) => {
        fetch(`${API_BASE_URL}/wallet/transact`, 
        {method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({recipient, amount})})
        .then(res => res.json())
        .then(json => {
            console.log('submitTransaction json ', json);
            alert('Success!');
            window.open('/transaction-pool');
        });
    }


    return (
        <div className="ConductTransaction">
            <Link to="/">Home</Link>
            <hr />
            <h3>Contact a Transaction</h3>
            <br />
            <FormGroup>
                <FormControl 
                input="text" 
                placeholder="recipient" 
                value={recipient} 
                onChange={updateRecipient}/>
            </FormGroup>
            <FormGroup>
                <FormControl 
                input="number" 
                placeholder="amount" 
                value={amount} 
                onChange={updateAmount}/>
            </FormGroup>
            <div>
                <Button variant="danger" onClick={submitTransaction}>
                    Submit
                </Button>
            </div>
            <br />
            <h4>Known Addresses</h4>
            <div>
                {
                    knownAddresses.map((knownAddress, i) => (
                    <span key={knownAddress}>
                        <u>{knownAddress}</u>{i !== knownAddress.length - 1 ? ', ' : ''}
                    </span>
                    ))
                }
            </div>
        </div>
    )
}
