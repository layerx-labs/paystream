import { useEffect, useState, useContext } from "react";
import { WebConnectionCtx } from "../context";
import { IDappkitReactProvider } from "../lib/IDappkitReactProvider";
import useAsync from "./useAsync";

const useChainId = (): {
  chainId: number | null;
  loading: boolean;
  error: string;
} => {
  const proxy: IDappkitReactProvider = useContext(WebConnectionCtx);

  const execute = async () => {
    return proxy.getConnection().eth.getChainId();
  };

  const { loading, error, result } = useAsync(execute);

  return { error, loading, chainId: result };
};

export default useChainId;
