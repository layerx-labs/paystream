import { WebConnectionCtx } from "../context";
import { useContext } from "react";
import { useContract } from "./useContract";


const useCreatePaymentStream =(contractAddress: string) =>{
    const proxy = useContext(WebConnectionCtx);    
    const { contract } = useContract(contractAddress);
    
    
    return {};
}