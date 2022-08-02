import {ContractSendMethod} from 'web3-eth-contract';
import {ContractCallMethod} from '@taikai/dappkit';

export interface SablierMethods {


    addPauser(account: string): ContractSendMethod

  balanceOf(streamId: number, who: string): ContractCallMethod<{'balance': number;}>;

  cancelStream(streamId: number): ContractSendMethod;

  createCompoundingStream(recipient: string, deposit: number, tokenAddress: string, startTime: number, stopTime: number, senderSharePercentage: number, recipientSharePercentage: number): ContractSendMethod;

  createStream(recipient: string, deposit: number, tokenAddress: string, startTime: number, stopTime: number): ContractSendMethod;

  deltaOf(streamId: number): ContractCallMethod<{'delta': number;}>;

  fee(): ContractCallMethod<{'mantissa': number;}>;

  getCompoundingStream(streamId: number): ContractCallMethod<{'sender': string;'recipient': string;'deposit': number;'tokenAddress': string;'startTime': number;'stopTime': number;'remainingBalance': number;'ratePerSecond': number;'exchangeRateInitial': number;'senderSharePercentage': number;'recipientSharePercentage': number;}>;

  getEarnings(tokenAddress: string): ContractCallMethod<number>;

  getStream(streamId: number): ContractCallMethod<{'sender': string;'recipient': string;'deposit': number;'tokenAddress': string;'startTime': number;'stopTime': number;'remainingBalance': number;'ratePerSecond': number;}>;

  getTokenDecimals(tokenAddress: string): ContractSendMethod;

  getTokenDecimalsFromStream(streamId: number): ContractSendMethod;

  initialize(sender: string): ContractSendMethod

  interestOf(streamId: number, amount: number): ContractSendMethod;

  isCompoundingStream(streamId: number): ContractCallMethod<boolean>;

  isPauser(account: string): ContractCallMethod<boolean>;

  nextStreamId(): ContractCallMethod<number>;

  owner(): ContractCallMethod<string>;

  pause(): ContractSendMethod

  paused(): ContractCallMethod<boolean>;

  takeEarnings(tokenAddress: string, amount: number): ContractSendMethod

  transferOwnership(newOwner: string): ContractSendMethod

  unpause(): ContractSendMethod

  updateFee(feePercentage: number): ContractSendMethod

  withdrawFromStream(streamId: number, amount: number): ContractSendMethod;

}