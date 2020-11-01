import React, {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import Block from './Block';
import {Link} from 'react-router-dom';

const PAGE_RANGE = 3;

export default function Blockchain() {
    const API_BASE_URL = 'http://localhost:5000';
    const [blockchain, setBlockchain] = useState([]);
    const [blockchainLength, setBlockchainLength] = useState(0);

    const fetchBlockchainPage = ({start, end}) => {
        fetch(`${API_BASE_URL}/blockchain/range?start=${start}&end=${end}`)
        .then(res => res.json())
        .then( json => setBlockchain(json));
    }

    useEffect(() => {
        fetchBlockchainPage({start: 0, end: PAGE_RANGE});

        fetch(`${API_BASE_URL}/blockchain/length`)
        .then(res => res.json())
        .then( json => setBlockchainLength(json));

    }, []);


    const buttonNumbers = [];
    for (let i=0; i<Math.ceil(blockchainLength/PAGE_RANGE); i++){
        buttonNumbers.push(i)
    }

    return (
        <div className="Blockchain">
            <Link to="/">Home</Link>
            <hr />
            <h3>Blockchain</h3>
            <div>{blockchain.map(block => <Block key={block.hash} blockInfo={block} />)}</div>
            <div>
                {
                    buttonNumbers.map(number => {
                        const start = number * PAGE_RANGE;
                        const end = (number + 1) * PAGE_RANGE;
                        return (
                            <span key={number} onClick={() => fetchBlockchainPage({start, end})}>
                                <Button size="sm" variant="danger">
                                    {number + 1}
                                </Button>{' '}
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}
