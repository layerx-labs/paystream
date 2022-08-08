import { ERC20, Web3Connection } from "@taikai/dappkit";
import { useEffect, useState } from "react";

export const useERC20Balance = (con: Web3Connection, contractAddress: string, address: string) => {
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!con || !con.started  || !address) {
      setBalance(0);
      return;
    }
    const erc20 = new ERC20(con, contractAddress);
    erc20.loadContract().then(async ()=> {
        try {
            console.log("Getting Balance ", address);
            const tokenBalance = await erc20.getTokenAmount(address);
            setBalance(tokenBalance);    
        } catch (error: any) {
            console.log(error);
            setError(error.message);
        }        
    });
  }, [contractAddress, address]);

  return { error, balance };
};
