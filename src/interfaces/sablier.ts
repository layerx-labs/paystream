import {ContractSendMethod} from 'web3-eth-contract';
import {ContractCallMethod} from '@taikai/dappkit';

export interface SablierMethods {


    balanceOf(streamId: number, who: string): ContractCallMethod<{'balance': number;}>;

  cancelStream(streamId: number): ContractSendMethod;

  createStream(recipient: string, deposit: number, tokenAddress: string, startTime: number, stopTime: number): ContractSendMethod;

  deltaOf(streamId: number): ContractCallMethod<{'delta': number;}>;

  getStream(streamId: number): ContractCallMethod<{'sender': string;'recipient': string;'deposit': number;'tokenAddress': string;'startTime': number;'stopTime': number;'remainingBalance': number;'ratePerSecond': number;}>;

  nextStreamId(): ContractCallMethod<number>;

  withdrawFromStream(streamId: number, amount: number): ContractSendMethod;

}