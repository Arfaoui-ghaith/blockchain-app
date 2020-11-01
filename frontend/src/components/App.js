import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
function App() {
  const API_BASE_URL = 'http://localhost:5000';
  const [walletInfo, setWalletInfo] = useState({});

  useEffect(() => {
    fetch(`${API_BASE_URL}/wallet/info`)
    .then(response => response.json())
    .then(json => setWalletInfo(json));
  }, []);

  return (
    <div className="App">
      <img className="logo" src="./assets/logo.png" alt="logo"/>
      <h3>Welcome to pychain</h3>
      <br />
      <Link to="/blockchain">Blockchain</Link>
      <Link to="/conduct-transaction">Conduct a Transaction</Link>
      <Link to="/transaction-pool">Transaction Pool</Link>
      
      <br />
      <div className="WalletInfo">
        <div>Address: {walletInfo.address}</div>
        <div>Balance: {walletInfo.balance}</div>
      </div>
      
    </div>
  );
}

export default App;
