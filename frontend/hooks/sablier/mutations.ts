import { useCallback, useContext, useState } from "react";
import { Sablier, SablierMethods } from "paystream-sdk";
import { TransactionReceipt } from "@taikai/dappkit/dist/src/interfaces/web3-core";
import { dappConfig } from "../../config";
import { chainDict } from "../../constants/networks";
import { ContractSendMethod } from "web3-eth-contract";


export type MutationArgs = {
  onTransactionHash?: (hash: string) => void;
  onTransactionSent?: (payload: object) => void;
  onTransactionReceipt?: (receipt: TransactionReceipt) => void;
  onError?: (error: Error) => void;
};

export type CreateStreamCallArgType = Parameters<SablierMethods["createStream"]>;

export type MutateReturnType<MutateArgsType extends any[]> = {
  loading: boolean;
  error: Error | null;
  receipt: TransactionReceipt | null;
  mutate: (...args: MutateArgsType) => void;
};

/**
 * Creates a Payment Stream
 * @param contract
 * @param args
 * @returns
 */
export const useCallSablier = <Method extends string & keyof SablierMethods > (
  contracAddress: string,
  method: string,
  args: MutationArgs
): MutateReturnType<Parameters<SablierMethods[Method]>> => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error|null>(null);
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);
  const mutate = useCallback(
    async (
        ...mutateArgs: any[]
    ) => {
      setLoading(true);
      setError(null);
      try {
        const contract = new Sablier({          
            web3Host: chainDict[dappConfig.chainId].rpc,          
          },
          contracAddress
        );
        await contract.connect();
        await contract.start();      
        const from = await contract.connection.getAddress();
        const methodToCall = contract.contract.methods[method];     
        const sendMethod: ContractSendMethod = methodToCall(
            ...mutateArgs
        );
        const gasPrice = await contract.web3.eth.getGasPrice();
        const gas = await sendMethod.estimateGas({ from, value: 0});     
        const nonce = await contract.web3.eth.getTransactionCount(
          from
        );
        sendMethod.send({ from, gasPrice, gas, nonce: nonce+1 })
          .on(
            "sent",
            (payload: object) => {
              args.onTransactionSent && args.onTransactionSent(payload)
            }              
          )
          .once(
            'transactionHash',
            (hash: string) => {
              args.onTransactionHash && args.onTransactionHash(hash)
            }
              
          )
          .on('receipt', (receipt: Object) => {
              args.onTransactionReceipt && args.onTransactionReceipt(receipt as TransactionReceipt) 
              setLoading(false);
              setReceipt(receipt as TransactionReceipt);
          })
          .on(
            'error',
            (e: Error) => {             
              args.onError && args.onError(e)
              setError(e);
              setLoading(false);
            }
          );
      } catch (e: any) {
        console.error(e);
        args.onError && args.onError(e);
        setError(e);
      } 
    },
    [contracAddress]
  );

  return { loading, error, receipt, mutate };
};

