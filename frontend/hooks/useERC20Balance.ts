import { ERC20 } from "@taikai/dappkit";
import { useEffect, useState, useContext, useCallback } from "react";
import { WebConnectionCtx } from "../context";

const useERC20Balance = (contractAddress: string, address: string): {
  loading: boolean,
  error: string | null,
  balance: number
} => {
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);  
  const proxy = useContext(WebConnectionCtx);

  const execute = useCallback(async ()=> { 
    setLoading(true);      
    try {
      const erc20 = new ERC20(proxy.getConnection(), contractAddress);
      await erc20.loadContract();
      const tokenBalance = await erc20.getTokenAmount(address);
      setBalance(tokenBalance);    
    } catch (error: any) {
        setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [contractAddress, address]);

  useEffect(() => {
    if(contractAddress && address) {
      execute();
    }    
  }, [contractAddress, address])

  return { loading, error, balance };
};


export default useERC20Balance;