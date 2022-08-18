import { useEffect, useState, useContext } from "react";
import { WebConnectionCtx } from "../context";
import { IWeb3ConnectionProxy } from "../lib/IWeb3ConnectionProxy";
import useAsync from "./useAsync";

const useChainId = (): {
  chainId: number | null;
  loading: boolean;
  error: string;
} => {
  const proxy: IWeb3ConnectionProxy = useContext(WebConnectionCtx);

  const execute = async () => {
    return proxy.getConnection().eth.getChainId();
  };

  const { loading, error, result } = useAsync(execute);

  return { error, loading, chainId: result };
};

export default useChainId;
