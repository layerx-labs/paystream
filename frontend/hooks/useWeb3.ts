import { useEffect, useState, useContext } from "react";
import { WebConnectionCtx } from "../context";
import { IDappkitReactProvider } from "../lib/IDappkitReactProvider";

export const useWeb3 = () => {
  const proxy: IDappkitReactProvider = useContext(WebConnectionCtx);
  const [connected, setConnected] = useState(proxy.isConnected());
  const address = proxy.getAddress();
  const chainId = proxy.getChainId();
  const [error, setError] = useState("");

  const reactor = {
    onConnectionEvent: () => {
      setConnected(true);
    },
    onDisconnectEvent: () => {
      setConnected(false);
    },
    onError: (e: Error) => {
      console.error(e);
      setError(e.message);
    },
  };

  useEffect(() => {
    proxy.subscribe(reactor);
    return () => {
      proxy.unsubscribe(reactor);
    };
  }, []);

  return {
    connected,
    connect: () => {
      proxy.connect();
    },
    disconnect: () => {
      proxy.disconnect();
    },
    error,
    chainId,
    address,
  };
};
