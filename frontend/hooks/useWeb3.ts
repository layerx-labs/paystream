import { useEffect, useState, useCallback} from "react";
import { Web3Connection } from "@taikai/dappkit";
import { chainDict } from "../constants/networks";
import {Errors} from '@taikai/dappkit/dist/src/interfaces/error-enum';
import { dappConfig } from "../config";

export const useWeb3 = (
  connection: Web3Connection
  ) => 
  {
  const [connected, setConnected] = useState(connection.started);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState(connection.Account ? connection.Account.address: "");
  const [error, setError] = useState("");

  const onAccountsChanged = (prevAddress: string )=>(newAddresses: string[]) => {
    debugger
    const newAddress = newAddresses && newAddresses.length > 0 ? newAddresses[0] : "";
    if (dappConfig.disconnectOnSwitchAccount && prevAddress && newAddress && newAddress != prevAddress) {
      disconnect();
    }    
  };

  const onChainChanged = (prevChain: number) => (newChainId: string) => {
    if (dappConfig.disconnectOnChangeNetwork && newChainId && connection.utils.numberToHex(prevChain) !== newChainId) { 
      disconnect();
    } 
  };

  const onConnectionReady = async ()=> {
    if(!connected) {      
      const retrievedAdress = await connection.getAddress();
      setConnected(true);
      setError("");      
      setAddress(retrievedAdress);
      (window as any).ethereum.on('accountsChanged', onAccountsChanged(retrievedAdress));    
      (window as any).ethereum.on('chainChanged', onChainChanged(dappConfig.chainId));
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
            chainId: connection.utils.numberToHex(dappConfig.chainId),
            chainName: chainDict[dappConfig.chainId].name,
            rpcUrls: [chainDict[dappConfig.chainId].rpc]
          },
        ],
      });
      const connectedChainId = await connection.eth.getChainId();
      if (dappConfig.chainId !== connectedChainId) { 
        setError(`Connected to the wrong Chain Id ${connectedChainId} `);
      } else {
        onConnectionReady();
      }
    } catch (addError: any) {
      setError(`Failed to Add Supported chain ${dappConfig.chainId} - ${addError.message}`);
    } finally {
      setConnecting(false);
    }
  }

  const switchChain = async () => {
    try {
      setConnecting(true);      
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: connection.utils.numberToHex(dappConfig.chainId)}],
      });      
      const connectedChainId = await connection.eth.getChainId();   
      if (dappConfig.chainId !== connectedChainId) { 
        setError(`Connected to the wrong Chain Id ${connectedChainId} `);
      } else {
        onConnectionReady();
      }
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        if (dappConfig.addNewortk) {
          addNetwork();
        }
        setError(`Failed to Connect to Chain ${dappConfig.chainId} - Unrecognized Network`);
      } else {
        setError(`Failed to Connect to Chain ${dappConfig.chainId} - ${switchError.message}`);
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
      if (dappConfig.chainId !== connectedChainID) {       
        // 3. Tries to force the change network
        if(dappConfig.switchNetwork) {
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
    if (dappConfig.autonnect) {
      startConnection();
    }
  }, []);

  const connect = () => {
    startConnection();
  };
 
  return { connected, connecting, connection, connect, disconnect, error };
};

