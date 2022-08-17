import { WebConnectionCtx } from "../context";
import { useEffect, useState, useContext } from "react";
import { Model, Web3Connection, Web3ConnectionOptions} from "@taikai/dappkit";
import { Sablier } from "paystream-sdk";

const useSablier = (contractAddress: string) => {
  
 const proxy = useContext(WebConnectionCtx);
  const [contract, setContract] = useState(
    new Sablier(proxy.getConnection(),contractAddress )
  );
  contract.loadContract();

  useEffect(() => {
    setContract(new Sablier(proxy.getConnection(), contractAddress));
  }, [contractAddress]);

  return { contract };
}

export  default useSablier;