import { Web3Connection } from "@taikai/dappkit";
import { useContext, useEffect, useState } from "react";
import { WebConnectionCtx } from "../context";
import { IWeb3ConnectionProxy } from "../lib/IWeb3ConnectionProxy";
import useAsync from "./useAsync";

 const useAddress = (): {
  loading: boolean,
  error: string | null,
  address: string| null
 } =>  {

  const proxy: IWeb3ConnectionProxy = useContext(WebConnectionCtx);    
  
  const execute = async () => {
     return proxy.getConnection().getAddress();   
  };

  const { loading , error, result }= useAsync(execute);

  return {loading, address: result, error};
};


export default useAddress;