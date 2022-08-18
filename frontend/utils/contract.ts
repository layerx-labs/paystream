import { Web3Contract } from '@taikai/dappkit';
import { Sablier } from 'paystream-sdk';
import { dappConfig } from '../config';
import { chainDict } from '../constants/networks';
import { EventListener } from '../server/listeners/listeners-type';

export function registerEventListeners(
  contract: Web3Contract,
  ...listeners: EventListener[]
): void {
  listeners.forEach(listener => {
    contract.self.once(
      listener.eventName,
      listener.options ?? {},
      listener.callback
    );
  });
}

export async function startContract() {
  const sablier = new Sablier(
    {
      web3Host: chainDict[dappConfig.chainId].rpc,
    },
    dappConfig.sablierContractAddress
  );
  await sablier.start();
  return sablier;
}
