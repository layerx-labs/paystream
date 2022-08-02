import {EventData, PastEventOptions} from 'web3-eth-contract';
export interface CancelStreamEvent { returnValues: {'streamId': number;'sender': string;'recipient': string;'senderBalance': number;'recipientBalance': number;} }
export interface CreateCompoundingStreamEvent { returnValues: {'streamId': number;'exchangeRate': number;'senderSharePercentage': number;'recipientSharePercentage': number;} }
export interface CreateStreamEvent { returnValues: {'streamId': number;'sender': string;'recipient': string;'deposit': number;'tokenAddress': string;'startTime': number;'stopTime': number;} }
export interface OwnershipTransferredEvent { returnValues: {'previousOwner': string;'newOwner': string;} }
export interface PausedEvent { returnValues: {'account': string;} }
export interface PauserAddedEvent { returnValues: {'account': string;} }
export interface PauserRemovedEvent { returnValues: {'account': string;} }
export interface PayInterestEvent { returnValues: {'streamId': number;'senderInterest': number;'recipientInterest': number;'sablierInterest': number;} }
export interface TakeEarningsEvent { returnValues: {'tokenAddress': string;'amount': number;} }
export interface UnpausedEvent { returnValues: {'account': string;} }
export interface UpdateFeeEvent { returnValues: {'fee': number;} }
export interface WithdrawFromStreamEvent { returnValues: {'streamId': number;'recipient': string;'amount': number;} }