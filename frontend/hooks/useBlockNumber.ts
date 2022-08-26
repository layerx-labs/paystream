import { useContext } from "react";
import { WebConnectionCtx } from "../context";
import { IDappkitReactProvider } from "../lib/IDappkitReactProvider";
import useAsync from "./useAsync";

 const useBlockNumber= (): {
  loading: boolean,
  error: string | null,
  blockNumber: number| null
 } =>  {

  const proxy: IDappkitReactProvider = useContext(WebConnectionCtx);    
  
  const execute = async () => {
     return proxy.getConnection().eth.getBlockNumber();
  };

  const { loading , error, result }= useAsync(execute);

  return {loading, blockNumber: result, error};
};


export default useBlockNumber;