import { useEffect, useState, useContext } from "react";
import { WebConnectionCtx } from "../context";
import { IWeb3ConnectionProxy } from "../lib/IWeb3ConnectionProxy";

const useChainId = (): {
  chainId: number,
  loading: boolean,
  error: string,
} =>  {
  const proxy: IWeb3ConnectionProxy = useContext(WebConnectionCtx);
  
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState(0);
  const [loading, setLoading] = useState(false);

  const execute = async ()=> {
    setLoading(true);      
    try {
      const res = await proxy.getConnection().eth.getChainId();
      setChainId(res);    
    } catch (error: any) {
        setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
    execute()
  }, [])

  return {error, loading, chainId };
};

export default useChainId;
