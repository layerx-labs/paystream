import { useContract } from "./useContract";
import { useState } from "react";
import {ReceiptReactor, OnErrorReactor} from "../interfaces";

const useCreatePaymentStream = (
    contractAddress: string,
    onMutate: ReceiptReactor,
    onError?: OnErrorReactor,    
  ) => {

  const { contract } = useContract(contractAddress);
  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);

  const mutate = async (
    recipient: string,
    deposit: number,
    tokenAddress: string,
    startTime: number,
    stopTime: number
  ) => {
    setLoading(true);
    try {
        const receipt = await contract.createStream(
            recipient,
            deposit,
            tokenAddress,
            startTime,
            stopTime,
        )
        onMutate(receipt);
    } catch(e: any) {
        console.log(e);
        if(onError) {
            onError(e);
        }
        setError(e);
    } finally {
        setLoading(false);    
    }
  };

  return {loading, error, mutate};
};

export default useCreatePaymentStream;