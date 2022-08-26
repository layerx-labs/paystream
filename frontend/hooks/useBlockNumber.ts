import { useContext } from "react";
import { DappkitProviderCtx } from "../context";
import { IDappkitReactProvider } from "../lib/IDappkitReactProvider";
import useAsync from "./useAsync";

 const useBlockNumber= (): {
  loading: boolean,
  error: string | null,
  blockNumber: number| null
 } =>  {

  const dappkitProvider: IDappkitReactProvider = useContext(DappkitProviderCtx);    
  
  const execute = async () => {
     return dappkitProvider.getConnection().eth.getBlockNumber();
  };

  const { loading , error, result }= useAsync(execute);

  return {loading, blockNumber: result, error};
};


export default useBlockNumber;