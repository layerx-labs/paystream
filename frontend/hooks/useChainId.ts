import { useEffect, useState, useCallback} from "react";
import { Web3Connection } from "@taikai/dappkit";

 const useChainId = (connection: Web3Connection) => {
    const [chainId, setChainId] = useState(0);
  
    useEffect(()=> {
      if(connection.started) {
        connection.eth.getChainId().then((connectedChainId)=> {
          setChainId(connectedChainId);
        });   
      }    
    }, [connection]);
  
    return chainId;
}

export default useChainId;