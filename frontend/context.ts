import Web3ConnectionProxy from "./lib/Web3ConectionProxy";
import React from 'react';

import { chainDict } from "./constants/networks";
import { dappConfig } from "./config";

export const defaulProxy = new Web3ConnectionProxy(
    dappConfig.chainId,
    chainDict[dappConfig.chainId].rpc,
    {
        autonnect: false,
        switchNetwork: true,
        addNewortk: true,
        disconnectOnSwitchAccount: false,
        disconnectOnChangeNetwork: false,
    }
)

export const WebConnectionCtx = React.createContext(defaulProxy);

