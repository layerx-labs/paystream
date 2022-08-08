import { Web3Connection } from '@taikai/dappkit';
import React from 'react';


export const WebConnectionCtx = React.createContext(new Web3Connection({
    web3Host: "http://localhost:8545",
}));

