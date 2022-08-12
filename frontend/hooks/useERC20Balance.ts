import { ERC20, Web3Connection } from "@taikai/dappkit";
import { useEffect, useState, useContext } from "react";
import { WebConnectionCtx } from "../context";

export const useERC20Balance = (contractAddress: string, address: string) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const proxy = useContext(WebConnectionCtx);
  
  useEffect(() => {
    if (!proxy.isConnected && !address && !contractAddress) {
      setBalance(0);
      return;
    }
    const erc20 = new ERC20(proxy.getConnection(), contractAddress);
    erc20.loadContract().then(async ()=> {
        setLoading(true);
        try {
            console.log("Getting Balance ", address);
            const tokenBalance = await erc20.getTokenAmount(address);
            setBalance(tokenBalance);    
        } catch (error: any) {
            setError(error.message);
        } finally {
          setLoading(false);
        }
    });
  }, [contractAddress, loading. address]);

  return { error, balance };
};
