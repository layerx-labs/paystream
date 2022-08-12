import { useEffect, useState, useContext} from "react";
import { WebConnectionCtx } from "../context";

export const useBalance = () => {  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("");
  const proxy = useContext(WebConnectionCtx);
  
  useEffect(() => {
    if (!proxy.isConnected()) {
      setBalance("");
      return;
    }
    setLoading(true);
    proxy.getConnection()
      .getBalance()
      .then((newBalance) => {
        const weiBalance =  proxy.getConnection().utils.fromWei(newBalance);
        setBalance(weiBalance);      
      })
      .catch(e=> setError(e.message))
      .finally(()=>{
        setLoading(false);
      });
  }, []);

  return { error, loading, balance };
};
