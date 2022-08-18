import { useEffect, useState, useContext, useCallback } from "react";
import { WebConnectionCtx } from "../context";

/**
 * Get Ethereum Balance
 * @returns
 */
const useETHBalance = () : {
  loading: boolean,
  error: string | null,
  balance: string
} => {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("");

  const proxy = useContext(WebConnectionCtx);

  // Execute Async Call
  const execute = useCallback(async () => {
    setLoading(true);
    try {
      const res = await proxy.getConnection().getBalance();
      const weiBalance = proxy.getConnection().utils.fromWei(res);
      setBalance(weiBalance);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    execute();
  }, []);

  return { error, loading, balance };
};

export default useETHBalance;