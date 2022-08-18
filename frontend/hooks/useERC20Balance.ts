import { ERC20 } from "@taikai/dappkit";
import { useEffect, useState, useContext } from "react";
import { WebConnectionCtx } from "../context";
import { ConnectionEvent } from "../lib/IWeb3ConnectionProxy";

export const useERC20Balance = (contractAddress: string, address: string) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const proxy = useContext(WebConnectionCtx);
  
  const reactor = {
    onConnectionEvent: async (event: ConnectionEvent) => {
      console.log("Connect event");
     
    },
    onDisconnectEvent: () => {
      console.log("Disconnect event");
    },
  };

  useEffect(() => {
   if ( proxy.isConnected() ) {
     const  initiateCon = async ()=> {
      setLoading(true);
      const erc20 = new ERC20(proxy.getConnection(), contractAddress);
      await erc20.loadContract();
      try {
        const tokenBalance = await erc20.getTokenAmount(address);
        setBalance(tokenBalance);    
      } catch (error: any) {
          setError(error.message);
      } finally {
        setLoading(false);
      }
     };
     initiateCon();
    }
  }, [])

  useEffect(() => {
    proxy.subscribe(reactor);
    return () => {
      proxy.unsubscribe(reactor);
    };
  }, []);

  return { error, balance };
};
