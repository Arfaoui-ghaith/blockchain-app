import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Transaction from './Transaction';
import {Button} from 'react-bootstrap';
export default function TransactionPool() {
    const API_BASE_URL = 'http://localhost:5000';
    const [transactions, setTransactions] = useState([]);
    
    const fetchTransactions = () => { 
        fetch(`${API_BASE_URL}/transactions`)
        .then(res => res.json())
        .then(json => {
            setTransactions(json);
            
        });
    }

    useEffect(() => {
        fetchTransactions();
        const intervalId = setInterval(fetchTransactions, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const fetchMineBlock = () => {
        fetch(`${API_BASE_URL}/blockchain/mine`)
        .then(() => {
            alert('Success');
            window.open('/blockchain');
        })
    }

    return (
        <div className="TransactionPool">
            <Link to="/">Home</Link>
            <hr />
            <h3>Transaction Pool</h3>
            <div>
                {
                    transactions.map(transaction => (
                        <div key={transaction.id}>
                            <hr />
                            <Transaction transaction={transaction} />
                        </div>
                    ))
                }
            </div>
            <hr />
            <Button variant="danger" onClick={fetchMineBlock}>
                Mine a block of these transactions
            </Button>
        </div>
    )
}
