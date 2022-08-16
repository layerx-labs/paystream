import { useEffect, useState, useContext } from "react";
import { WebConnectionCtx } from "../context";
import {
  ConnectionEvent,
} from "../lib/IWeb3ConnectionProxy";
import { IWeb3ConnectionProxy } from "../lib/IWeb3ConnectionProxy";

const useChainId = () => {
  const proxy: IWeb3ConnectionProxy = useContext(WebConnectionCtx);
  const [chainId, setChainId] = useState(proxy.isConnected()? proxy.getChainId(): 0);
  const reactor = {
    onConnectionEvent: (event: ConnectionEvent) => {
      setChainId(event.chainId);
    },
    onDisconnectEvent: () => {
      setChainId(0);
    },
  };

  useEffect(() => {
    proxy.subscribe(reactor);
    return () => {
      proxy.unsubscribe(reactor);
    };
  }, []);

  return chainId;
};

export default useChainId;
