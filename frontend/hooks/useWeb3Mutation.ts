import { useContract } from "./useContract";
import { useState } from "react";
import {ReceiptReactor, OnErrorReactor} from "../interfaces";
import { SablierMethods } from "paystream-sdk";
import { TransactionReceipt } from "@taikai/dappkit/dist/src/interfaces/web3-core";

export type Web3HookReturnType<A extends any> = {
    loading: boolean,
    error: Error | null,
    mutate: (args: A) => void
}
export type Web3HookArgType = {
    contractAddress: string,
    onMutate?: ReceiptReactor,
    onError?: OnErrorReactor,    
} 

const useWeb3Mutation = <
    T extends ContractInterface,
    ContractInterface extends { [Property in keyof ContractInterface as string]: (args: any) => any },
    Key extends string & keyof ContractInterface
    >
    (contract: T, functionName: Key, useArgs: Web3HookArgType ): Web3HookReturnType<Parameters<ContractInterface[Key]>>  => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);
    
    const mutate = async (options: Parameters<ContractInterface[Key]>) => {
       setLoading(true);
        try {
            const receipt = await contract[functionName](
                options,
            )
            useArgs.onMutate && useArgs.onMutate(receipt);
        } catch(e: any) {
            console.log(e);
            if(useArgs.onError) {
                useArgs.onError(e);
            }
            setError(e);
        } finally {
            setLoading(false);    
        }
      };
      return {loading, error, mutate};
};

export type createStreamFuncName = 'createStream';
export type CreateStreamMethod = Pick<SablierMethods, createStreamFuncName>

export type MapToReceipt<T>= {
    [Property in keyof T]:  (...args: any) => Promise<TransactionReceipt>
} 

export default useWeb3Mutation;

