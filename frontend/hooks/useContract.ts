import { WebConnectionCtx } from "../context";
import { useEffect, useState, useContext } from "react";
import { Sablier } from 'paystream-sdk';

export const useContract = (contractAddress: string) => {
    const proxy = useContext(WebConnectionCtx);

    const [contract, setContract] = useState(new Sablier(proxy.getConnection(), contractAddress));
    contract.loadContract();

    useEffect(() => {
        setContract(new Sablier(proxy.getConnection(), contractAddress));
    }, [contractAddress]);

    return { contract };
};
