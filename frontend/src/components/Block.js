import React, { useState } from 'react';
import {Button} from 'react-bootstrap';
import Transaction from './Transaction';


function ToggleTransactionDisplay({ block }){
    const [displayTransaction, setDisplayTransaction] = useState(false);
    const {data} = block;

    const toggleDisplayTransaction = () => { 
        setDisplayTransaction(!displayTransaction);
    }
    if (displayTransaction){
        return(<div>
                {
                    data.map(transaction => (
                        <div key={transaction.id}>
                            <hr />
                            <Transaction transaction={transaction} />
                        </div>
                    ))
                }
                <br />
                <Button variant="danger" size="sm" onClick={toggleDisplayTransaction}>Show Less</Button>
            </div>);
    }

    return (
        <div>
            <br />
            <Button variant="danger" size="sm" onClick={toggleDisplayTransaction}>Show More</Button>
        </div>
    );
}


export default function Block(props) {
    const NANOSECONDS_PY = 1;
    const MICROSECONDS_PY = 1000 * NANOSECONDS_PY;
    const MILLISECONDS_PY = 1000 * MICROSECONDS_PY;
    const {timestamp, hash} = props.blockInfo;
    const timestampDisplay = new Date(timestamp / MILLISECONDS_PY).toLocaleString();

    return (
        <div className="Block">
            <div>Hash: {hash}</div>
            <div>Timestamp: {timestampDisplay}</div>
            <ToggleTransactionDisplay block={props.blockInfo} />
        </div>
    )
}
