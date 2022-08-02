import {Model, Web3Connection, Web3ConnectionOptions, Deployable, XEvents} from '@taikai/dappkit';

import SablierJson from 'build/contracts/protocol/Sablier.sol/Sablier.json';
import { SablierMethods } from 'src/interfaces/sablier';
import * as Events from 'src/events/sablier'
import {PastEventOptions} from 'web3-eth-contract';
import {AbiItem} from 'web3-utils';

export class Sablier extends Model<SablierMethods> implements Deployable {
  constructor(web3Connection: Web3Connection|Web3ConnectionOptions, contractAddress?: string) {
    super(web3Connection, SablierJson.abi as AbiItem[], contractAddress);
  }

  async deployJsonAbi() {
    const deployOptions = {
      data: SablierJson.bytecode,
      arguments: [
        
      ]
    }
    return this.deploy(deployOptions, this.connection.Account);
  }

    async addPauser(account: string) { 
    return this.sendTx(this.contract.methods.addPauser(account));
  }

  async balanceOf(streamId: number, who: string) { 
    return this.callTx(this.contract.methods.balanceOf(streamId, who));
  }

  async cancelStream(streamId: number) { 
    return this.sendTx(this.contract.methods.cancelStream(streamId));
  }

  async createCompoundingStream(recipient: string, deposit: number, tokenAddress: string, startTime: number, stopTime: number, senderSharePercentage: number, recipientSharePercentage: number) { 
    return this.sendTx(this.contract.methods.createCompoundingStream(recipient, deposit, tokenAddress, startTime, stopTime, senderSharePercentage, recipientSharePercentage));
  }

  async createStream(recipient: string, deposit: number, tokenAddress: string, startTime: number, stopTime: number) { 
    return this.sendTx(this.contract.methods.createStream(recipient, deposit, tokenAddress, startTime, stopTime));
  }

  async deltaOf(streamId: number) { 
    return this.callTx(this.contract.methods.deltaOf(streamId));
  }

  async fee() { 
    return this.callTx(this.contract.methods.fee());
  }

  async getCompoundingStream(streamId: number) { 
    return this.callTx(this.contract.methods.getCompoundingStream(streamId));
  }

  async getEarnings(tokenAddress: string) { 
    return this.callTx(this.contract.methods.getEarnings(tokenAddress));
  }

  async getStream(streamId: number) { 
    return this.callTx(this.contract.methods.getStream(streamId));
  }

  async getTokenDecimals(tokenAddress: string) { 
    return this.sendTx(this.contract.methods.getTokenDecimals(tokenAddress));
  }

  async getTokenDecimalsFromStream(streamId: number) { 
    return this.sendTx(this.contract.methods.getTokenDecimalsFromStream(streamId));
  }

  async initialize(sender: string) { 
    return this.sendTx(this.contract.methods.initialize(sender));
  }

  async interestOf(streamId: number, amount: number) { 
    return this.sendTx(this.contract.methods.interestOf(streamId, amount));
  }

  async isCompoundingStream(streamId: number) { 
    return this.callTx(this.contract.methods.isCompoundingStream(streamId));
  }

  async isPauser(account: string) { 
    return this.callTx(this.contract.methods.isPauser(account));
  }

  async nextStreamId() { 
    return this.callTx(this.contract.methods.nextStreamId());
  }

  async owner() { 
    return this.callTx(this.contract.methods.owner());
  }

  async pause() { 
    return this.sendTx(this.contract.methods.pause());
  }

  async paused() { 
    return this.callTx(this.contract.methods.paused());
  }

  async takeEarnings(tokenAddress: string, amount: number) { 
    return this.sendTx(this.contract.methods.takeEarnings(tokenAddress, amount));
  }

  async transferOwnership(newOwner: string) { 
    return this.sendTx(this.contract.methods.transferOwnership(newOwner));
  }

  async unpause() { 
    return this.sendTx(this.contract.methods.unpause());
  }

  async updateFee(feePercentage: number) { 
    return this.sendTx(this.contract.methods.updateFee(feePercentage));
  }

  async withdrawFromStream(streamId: number, amount: number) { 
    return this.sendTx(this.contract.methods.withdrawFromStream(streamId, amount));
  }

  async getCancelStreamEvents(filter: PastEventOptions): Promise<XEvents<Events.CancelStreamEvent>[]> {
    return this.contract.self.getPastEvents('CancelStream', filter);
  }

  async getCreateCompoundingStreamEvents(filter: PastEventOptions): Promise<XEvents<Events.CreateCompoundingStreamEvent>[]> {
    return this.contract.self.getPastEvents('CreateCompoundingStream', filter);
  }

  async getCreateStreamEvents(filter: PastEventOptions): Promise<XEvents<Events.CreateStreamEvent>[]> {
    return this.contract.self.getPastEvents('CreateStream', filter);
  }

  async getOwnershipTransferredEvents(filter: PastEventOptions): Promise<XEvents<Events.OwnershipTransferredEvent>[]> {
    return this.contract.self.getPastEvents('OwnershipTransferred', filter);
  }

  async getPausedEvents(filter: PastEventOptions): Promise<XEvents<Events.PausedEvent>[]> {
    return this.contract.self.getPastEvents('Paused', filter);
  }

  async getPauserAddedEvents(filter: PastEventOptions): Promise<XEvents<Events.PauserAddedEvent>[]> {
    return this.contract.self.getPastEvents('PauserAdded', filter);
  }

  async getPauserRemovedEvents(filter: PastEventOptions): Promise<XEvents<Events.PauserRemovedEvent>[]> {
    return this.contract.self.getPastEvents('PauserRemoved', filter);
  }

  async getPayInterestEvents(filter: PastEventOptions): Promise<XEvents<Events.PayInterestEvent>[]> {
    return this.contract.self.getPastEvents('PayInterest', filter);
  }

  async getTakeEarningsEvents(filter: PastEventOptions): Promise<XEvents<Events.TakeEarningsEvent>[]> {
    return this.contract.self.getPastEvents('TakeEarnings', filter);
  }

  async getUnpausedEvents(filter: PastEventOptions): Promise<XEvents<Events.UnpausedEvent>[]> {
    return this.contract.self.getPastEvents('Unpaused', filter);
  }

  async getUpdateFeeEvents(filter: PastEventOptions): Promise<XEvents<Events.UpdateFeeEvent>[]> {
    return this.contract.self.getPastEvents('UpdateFee', filter);
  }

  async getWithdrawFromStreamEvents(filter: PastEventOptions): Promise<XEvents<Events.WithdrawFromStreamEvent>[]> {
    return this.contract.self.getPastEvents('WithdrawFromStream', filter);
  }

}