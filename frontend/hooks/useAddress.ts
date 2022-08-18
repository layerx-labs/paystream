import { Web3Connection } from "@taikai/dappkit";
import { useContext, useEffect, useState } from "react";
import { WebConnectionCtx } from "../context";
import { IWeb3ConnectionProxy } from "../lib/IWeb3ConnectionProxy";

 const useAddress = (con: Web3Connection): {
  loading: boolean,
  error: string | null,
  address: string
 } =>  {

  const proxy: IWeb3ConnectionProxy = useContext(WebConnectionCtx);  
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const execute = async ()=> {
    setLoading(true);      
    try {
      const res = await proxy.getConnection().getAddress();
      setAddress(res);    
    } catch (error: any) {
        setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
    execute()
  }, [])

  return {loading, address, error};
};


export default useAddress;