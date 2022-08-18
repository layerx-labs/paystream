import Web3ConnectionProxy from './lib/Web3ConectionProxy';
import React from 'react';

import { chainDict } from './constants/networks';
import { dappConfig } from './config';

export const defaulProxy = new Web3ConnectionProxy(
  dappConfig.chainId,
  chainDict[dappConfig.chainId].rpc,
  {
    autoconnect: false,
    switchNetwork: true,
    addNetwork: true,
    disconnectOnSwitchAccount: false,
    disconnectOnChangeNetwork: false,
  }
);

export const WebConnectionCtx = React.createContext(defaulProxy);
