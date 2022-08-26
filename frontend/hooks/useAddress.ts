import { useContext } from "react";
import { DappkitProviderCtx } from "../context";
import { IDappkitReactProvider } from "../lib/IDappkitReactProvider";
import useAsync from "./useAsync";

 const useAddress = (): {
  loading: boolean,
  error: string | null,
  address: string| null
 } =>  {

  const proxy: IDappkitReactProvider = useContext(DappkitProviderCtx);    
  
  const execute = async () => {
     return proxy.getConnection().getAddress();   
  };

  const { loading , error, result }= useAsync(execute);

  return {loading, address: result, error};
};


export default useAddress;