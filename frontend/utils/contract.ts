import { Web3Contract } from '@taikai/dappkit';
import { EventListener } from 'paystream-sdk/src';

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
