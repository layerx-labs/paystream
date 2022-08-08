import { ETHUtils, Web3Connection } from "@taikai/dappkit";
import { useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";
import {Unit} from 'web3-utils';

export const useBalance = (con: Web3Connection, isConnected: boolean) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (!con || !con.started || !isConnected) {
      setLoading(false);
      setBalance("");
      return;
    }
    setLoading(true);
    con
      .getBalance()
      .then((newBalance) => {
        const weiBalance = con.utils.fromWei(newBalance);
        setBalance(weiBalance);      
      })
      .catch(e=> setError(e.message));
  }, [isConnected]);

  return { error, loading, balance };
};
