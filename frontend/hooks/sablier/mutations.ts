import { useCallback, useState } from "react";
import { ReceiptReactor, OnErrorReactor } from "../../interfaces";
import { Sablier, SablierMethods } from "paystream-sdk";
import { TransactionReceipt } from "@taikai/dappkit/dist/src/interfaces/web3-core";
import { dappConfig } from "../../config";
import { chainDict } from "../../constants/networks";

export type MutationArgs = {
  onMutate?: ReceiptReactor;
  onError?: OnErrorReactor;
};

export type CreateStreamReturnType = {
  loading: boolean;
  error: Error | null;
  receipt: TransactionReceipt | null;
  mutate: (
    recipient: string,
    deposit: number,
    tokenAddress: string,
    startTime: number,
    stopTime: number
  ) => void;
};
/**
 * Creates a Payment Stream 
 * @param contract 
 * @param args 
 * @returns 
 */
export const useCreateStreamCall = (
  contracAddress: string,
  args: MutationArgs
): CreateStreamReturnType => {
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);

  const mutate = useCallback(
    async (
      recipient: string,
      deposit: number,
      tokenAddress: string,
      startTime: number,
      stopTime: number
    ) => {
      setLoading(true);
      try {
        const contract = new Sablier({
          web3Host: chainDict[dappConfig.chainId].rpc,
      }, contracAddress);
      await contract.start();
        const receipt = await contract.createStream(
          recipient,
          deposit,
          tokenAddress,
          startTime,
          stopTime
        );
        setReceipt(receipt);
        args.onMutate && args.onMutate(receipt);
      } catch (e: any) {
        console.error(e);
        args.onError && args.onError(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [contracAddress]
  );

  return { loading, error, receipt, mutate };
};

export type MapToReceipt<T> = {
  [Property in keyof T]: (...args: any) => Promise<TransactionReceipt>;
};
