import { ERC20 } from "@taikai/dappkit";
import {  useCallback, useContext, useEffect, useState } from "react";
import { DappkitProviderCtx } from "../context";
import useAsync from "./useAsync";

const useERC20TokenAllowance = (contractAddress: string, owner: string, spender: string): {
  loading: boolean,
  error: string | null,
  allowed: number
} => {
    
    const proxy = useContext(DappkitProviderCtx);
    useEffect(()=>{
        if (contractAddress && owner && spender ) {
            execute();
        }
    }, [contractAddress, owner, spender])
    
    const executeFunc = useCallback(async () => {     
        const erc20 = new ERC20(proxy.getConnection(), contractAddress);
        await erc20.loadContract();
        return await erc20.allowance(owner, spender);      
     }, [contractAddress, owner, spender]);
   
    const { loading , error, result, execute} = useAsync(executeFunc, false);
   
  return { loading, error, allowed: result? result: 0 };
};


export default useERC20TokenAllowance;