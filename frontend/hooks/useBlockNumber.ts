import { useContext } from "react";
import { WebConnectionCtx } from "../context";
import { IWeb3ConnectionProxy } from "../lib/IWeb3ConnectionProxy";
import useAsync from "./useAsync";

 const useBlockNumber= (): {
  loading: boolean,
  error: string | null,
  blockNumber: number| null
 } =>  {

  const proxy: IWeb3ConnectionProxy = useContext(WebConnectionCtx);    
  
  const execute = async () => {
     return proxy.getConnection().eth.getBlockNumber();
  };

  const { loading , error, result }= useAsync(execute);

  return {loading, blockNumber: result, error};
};


export default useBlockNumber;