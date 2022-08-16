import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import {WebConnectionCtx, defaulProxy} from '../context';

function MyApp({ Component, pageProps }: AppProps) {
 
  return (
    <WebConnectionCtx.Provider value={defaulProxy}>
        <Component {...pageProps} />
    </WebConnectionCtx.Provider>
  );
}

export default MyApp
