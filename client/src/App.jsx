import { useState, useEffect } from 'react';
import abi from './contractJson/chai.json';
import { ethers } from 'ethers';
import Memos from './components/Memos';
import Buy from './components/Buy';

import './App.css';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState('Not connected');
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const contractAddress = '0x771E75Fdd5bbf64456305b8a2bF58289d4Ef52dE';
      const contractABI = abi.abi;

      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        setMetamaskInstalled(true);
      } else {
        setMetamaskInstalled(false);
      }

      // If MetaMask is installed and connected, proceed to connect
      if (metamaskInstalled) {
        try {
          const { ethereum } = window;
          const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
          });

          window.ethereum.on('accountsChanged', () => {
            window.location.reload();
          });
          setAccount(accounts[0]);
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);

          setState({ provider, signer, contract });
        } catch (error) {
          console.log(error);
        }
      }
    };

    initialize();
  }, [metamaskInstalled]);

  // Function to connect MetaMask
  const connectToMetamask = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      
        <small>Connected Account - {account}</small>
      
      {metamaskInstalled ? (
        account === 'Not connected' ? (
          <center>
          <button onClick={connectToMetamask}>Connect MetaMask</button>
          </center>
        ) : (
          <>
            <Buy state={state} />
            <Memos state={state} />
          </>
        )
      ) : (
        <p>MetaMask is not installed. Please install MetaMask to use this app.</p>
      )}
    </div>
  );
}

export default App;
