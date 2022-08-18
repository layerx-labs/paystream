import { useEffect, useState, useCallback, useContext } from "react";
import { Sablier } from "paystream-sdk";
import { WebConnectionCtx } from "../context";

/**
 * Hook to user Sablier Contract
 * @param contractAddress 
 * @returns 
 */
const useSablier = (contractAddress: string) : {
    loading: boolean,
    loaded: boolean,
    contract: Sablier
} =>  {
  const proxy = useContext(WebConnectionCtx);
  const [contract, setContract] = useState(
    new Sablier(proxy.getConnection(), contractAddress)
  );
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initiateConection = useCallback(async () => {    
    try {
      setLoading(true)
      await contract.start();
      //console.log(`Loaded Sablier[${contractAddress}]`);
      setLoaded(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
        setLoading(false);
    }
  }, [contract, contractAddress]);

  useEffect(() => {
    if (typeof window == "undefined" || !(window as any).ethereum || loaded || !contractAddress) {
        return;
    }   
    initiateConection();
  }, []);


  return { contract, loaded, loading};
};

export default useSablier;
