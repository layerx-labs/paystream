import { Web3Connection } from "@taikai/dappkit";
import { useEffect, useState } from "react";

 const useAddress = (con: Web3Connection) => {

  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!con || !con.started ) {
      setAddress("");
      return;
    }
    con.getAddress()     
      .then((address) => {
        setAddress(address)
      })
      .catch(e=> setAddress(""));
  }, [con]);

  return address;
};


export default useAddress;