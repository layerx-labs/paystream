import {Model, Web3Connection, Web3ConnectionOptions, Deployable, XEvents} from '@taikai/dappkit';

import SablierJson from 'artifacts/contracts/Sablier.sol/Sablier.json';
import { SablierMethods } from './src/interfaces/sablier';
import * as Events from './src/events/sablier'
import {PastEventOptions} from 'web3-eth-contract';
import {AbiItem} from 'web3-utils';

export class Sablier extends Model<SablierMethods> implements Deployable {
  constructor(web3Connection: Web3Connection|Web3ConnectionOptions, contractAddress?: string) {
    super(web3Connection, SablierJson.abi as AbiItem[], contractAddress);
  }


    async balanceOf(streamId: number, who: string) { 
    return this.callTx(this.contract.methods.balanceOf(streamId, who));
  }

  async cancelStream(streamId: number) { 
    return this.sendTx(this.contract.methods.cancelStream(streamId));
  }

  async createStream(recipient: string, deposit: number, tokenAddress: string, startTime: number, stopTime: number) { 
    return this.sendTx(this.contract.methods.createStream(recipient, deposit, tokenAddress, startTime, stopTime));
  }

  async deltaOf(streamId: number) { 
    return this.callTx(this.contract.methods.deltaOf(streamId));
  }

  async getStream(streamId: number) { 
    return this.callTx(this.contract.methods.getStream(streamId));
  }

  async nextStreamId() { 
    return this.callTx(this.contract.methods.nextStreamId());
  }

  async withdrawFromStream(streamId: number, amount: number) { 
    return this.sendTx(this.contract.methods.withdrawFromStream(streamId, amount));
  }

  async getCancelStreamEvents(filter: PastEventOptions): Promise<XEvents<Events.CancelStreamEvent>[]> {
    return this.contract.self.getPastEvents(CancelStream, filter);
  }
  async getCreateStreamEvents(filter: PastEventOptions): Promise<XEvents<Events.CreateStreamEvent>[]> {
    return this.contract.self.getPastEvents(CreateStream, filter);
  }
  async getWithdrawFromStreamEvents(filter: PastEventOptions): Promise<XEvents<Events.WithdrawFromStreamEvent>[]> {
    return this.contract.self.getPastEvents(WithdrawFromStream, filter);
  }
}