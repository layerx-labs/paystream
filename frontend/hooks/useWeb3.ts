import { useEffect, useState, useCallback} from "react";
import { Web3Connection } from "@taikai/dappkit";
import { chainDict } from "../constants/networks";
import {Errors} from '@taikai/dappkit/dist/src/interfaces/error-enum';

interface WebHookOptions {
  autonnect: boolean, 
  switchNetwork?: boolean,
  addNewortk?: boolean,
  disconnectOnSwitchAccount?: boolean,
  disconnectOnChangeNetwork?: boolean,
}

export const useWeb3 = (
  connection: Web3Connection, 
  chainId: number,
  options: WebHookOptions
  ) => 
  {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const onAccountsChanged = (prevAddress: string) => (newAddresses: string[]) => {
    const newAddress =
      newAddresses && newAddresses.length > 0 ? newAddresses[0] : "";
    if (options.disconnectOnSwitchAccount && prevAddress && newAddress && newAddress != prevAddress) {
      disconnect();
    }    
  };

  const onChainChanged = (prevChain: number) => (newChainId: string) => {
    if (options.disconnectOnChangeNetwork && newChainId && connection.utils.numberToHex(prevChain) !== newChainId) { 
      disconnect();
    } 
  };

  const onConnectionReady = async ()=> {
    if(!connected) {      
      const address = await connection.getAddress();
      setConnected(true);
      setError("");      
      setAddress(address);
      (window as any).ethereum.on('accountsChanged', onAccountsChanged(address));    
      (window as any).ethereum.on('chainChanged', onChainChanged(chainId));
    }
  };

  const disconnect = ()=> {
    (window as any).ethereum.on('accountsChanged', ()=> {});    
    (window as any).ethereum.on('chainChanged', ()=> {});
    console.log("false");
    setAddress("");
    setConnected(false);
    setError("");        
  };

  
  const addNetwork = async () => {
    try {
      setConnecting(true);
      await (window as any).ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: connection.utils.numberToHex(chainId),
            chainName: chainDict[chainId].name,
            rpcUrls: [chainDict[chainId].rpc]
          },
        ],
      });
      const connectedChainId = await connection.eth.getChainId();
      if (chainId !== connectedChainId) { 
        setError(`Connected to the wrong Chain Id ${connectedChainId} `);
      } else {
        onConnectionReady();
      }
    } catch (addError: any) {
      setError(`Failed to Add Supported chain ${chainId} - ${addError.message}`);
    } finally {
      setConnecting(false);
    }
  }

  const switchChain = async () => {
    try {
      setConnecting(true);      
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: connection.utils.numberToHex(chainId)}],
      });      
      const connectedChainId = await connection.eth.getChainId();   
      if (chainId !== connectedChainId) { 
        setError(`Connected to the wrong Chain Id ${connectedChainId} `);
      } else {
        onConnectionReady();
      }
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        if (options.addNewortk) {
          addNetwork();
        }
        setError(`Failed to Connect to Chain ${chainId} - Unrecognized Network`);
      } else {
        setError(`Failed to Connect to Chain ${chainId} - ${switchError.message}`);
      }      
    } finally {
      setConnecting(false);
    }
  }

  const startConnection = async () => {
    setConnecting(true);
    try {
      // 1. Tries to connect 
      const res = await connection.connect();
      // 2. Verify if you are connected to right network p.ex based on Network Id
      const connectedChainID = await connection.eth.getChainId();
      if (chainId !== connectedChainID) {       
        // 3. Tries to force the change network
        if(options.switchNetwork) {
          switchChain();
        } else {
          setError(`You are connected to the wrong chain ${connectedChainID}`);
        }        
      } else {
        onConnectionReady();
      }      
    } catch (e: any) {
      setError(e.message);
    } finally {
      setConnecting(false);
    }    
  };
 
  useEffect(() => {
    if (options.autonnect) {
      startConnection();
    }
  }, []);

  const connect = () => {
    startConnection();
  };
 
  return { connected, connecting, connection, connect, disconnect, error };
};

