import { Web3Connection } from "@taikai/dappkit";
import { useEffect, useState } from "react";

export const useAddress = (con: Web3Connection) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!con || !con.started ) {
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
  }, [con]);

  return { error, loading, address };
};
