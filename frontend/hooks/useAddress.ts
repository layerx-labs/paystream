import { Web3Connection } from "@taikai/dappkit";
import { useEffect, useState } from "react";

export const useAddress = (con: Web3Connection, isConnected: boolean) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!con || !con.started || !isConnected) {
      setLoading(false);
      setAddress("");
      return;
    }
    setLoading(true);
    con.getAddress()     
      .then((address) => {
        setAddress(address)
      })
      .catch(e=> setError(e.message));
  }, [isConnected]);

  return { error, loading, address };
};
