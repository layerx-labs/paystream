import { useEffect, useState } from "react";
import { Web3Connection } from "@taikai/dappkit";
import { chainDict } from "../constants/networks";

interface WebHookOptions {
  autonnect: boolean, 
  switchNetwork?: boolean,
  addNewortk?: boolean
}


export const useWeb3 = (
  connection: Web3Connection, 
  chainId: number,
  options: WebHookOptions
  ) => 
  {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState("");

  const addNetwork = async () => {
    try {
      setConnecting(true);
      await (window as any).ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: connection.utils.numberToHex(chainId),
            chainName: chainDict[chainId].name,
            rpcUrls: [chainDict[chainId].rpc] /* ... */,
          },
        ],
      });
      const networkID = await connection.eth.getChainId();
      if (chainId !== networkID) { 
        setError(`Connected to the wrong Chain Id ${networkID} `);
      } else {
        setConnected(true);
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
      console.log(`Switching to ${chainId} network`);
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: connection.utils.numberToHex(chainId)}],
      });      
      const networkID = await connection.eth.getChainId();   
      if (chainId !== networkID) { 
        setError(`Connected to the wrong Chain Id ${networkID} `);
      } else {
        setConnected(true);
      }
    } catch (switchError: any) {
      debugger;
      if (switchError.code === 4902) {
        console.log("Adding new chain");
        if (options.addNewortk) {
          addNetwork();
        }
      }
      setError(`Failed to Connect to Chain ${chainId} - ${switchError.message}`);
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
      const networkID = await connection.eth.getChainId();
      if (chainId !== networkID) {       
        // 3. Tries to force the change network
        if(options.switchNetwork) {
          switchChain();
        } else {
          setError(`You are connected to the wrong chain ${networkID}`);
        }        
      } else {
        setConnected(res);
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

  const disconnect = () => {
    if (connected) {
      setConnected(false);
    }
  };
  return { connected, connecting, connection, connect, disconnect, error };
};

