import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import {WebConnectionCtx} from '../context';
import { Web3Connection } from '@taikai/dappkit';
import { chainDict } from "../constants/networks";
import { dappConfig } from "../config";

function MyApp({ Component, pageProps }: AppProps) {
  const connection = new Web3Connection({
        web3Host: chainDict[dappConfig.chainId].rpc,
  });
     
  return (
    <WebConnectionCtx.Provider value={connection}>
        <Component {...pageProps} />
    </WebConnectionCtx.Provider>
  );
}

export default MyApp
