import { EventOptions, EventData } from 'web3-eth-contract';
import { EventNames } from '../../constants/events';
import { Web3Contract } from '@taikai/dappkit';

type EventListenerCallBackCustomData = {
  createdAt?: Date;
  updatedAt?: Date;
};

export type EventListenerCallBack = (
  error: Error | null | undefined,
  event: EventData,
  customData?: EventListenerCallBackCustomData
) => void | Promise<void>;

export type EventListener = {
  eventName: keyof typeof EventNames;
  options?: EventOptions;
  callback: EventListenerCallBack;
};

export type SyncWithPastEventsProps = {
  contract: Web3Contract;
  fromBlock: number;
  toBlock?: number;
  fromTxIndex: number;
  toTxIndex?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
