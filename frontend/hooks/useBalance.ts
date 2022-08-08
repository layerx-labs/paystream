import { Web3Connection } from "@taikai/dappkit";
import { useEffect, useState } from "react";

export const useBalance = (con: Web3Connection, isConnected: boolean) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!con || !con.started || !isConnected) {
      setLoading(false);
      setBalance(0);
      return;
    }
    setLoading(true);
    con
      .getBalance()
      .then((newBalance) => {
        setBalance(Number.parseInt(newBalance))
      })
      .catch(e=> setError(e.message));
  }, [isConnected]);

  return { error, loading, balance };
};
