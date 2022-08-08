import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import {WebConnectionCtx} from '../context';
import { Web3Connection } from '@taikai/dappkit';


function MyApp({ Component, pageProps }: AppProps) {
  const connection = new Web3Connection({
        web3Host: "http://localhost:8545",
  });
     
  return (
    <WebConnectionCtx.Provider value={connection}>
        <Component {...pageProps} />
    </WebConnectionCtx.Provider>
  );
}

export default MyApp
