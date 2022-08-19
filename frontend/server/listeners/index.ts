import {
  EventListener,
  EventListenerCallBack,
  SyncWithPastEventsProps,
} from './listeners-type';
import { registerEventListeners, startContract } from '../../utils/contract';
import { db } from '../services/database';
import { cancelStreamListener } from './stream/cancel-stream';
import { createStreamListener } from './stream/create-stream';
import { ownershipTransferredListener } from './stream/ownership-transferred';
import { pausedListener } from './stream/paused';
import { unpausedListener } from './stream/unpaused';
import { withdrawFromStreamListener } from './stream/withdraw-from-stream';
import { addMilliseconds } from '../../utils/date';

const callbacksMap: Partial<
  Record<EventListener['eventName'], EventListenerCallBack>
> = {
  CancelStream: cancelStreamListener,
  CreateStream: createStreamListener,
  OwnershipTransferred: ownershipTransferredListener,
  Paused: pausedListener,
  Unpaused: unpausedListener,
  WithdrawFromStream: withdrawFromStreamListener,
};

const listenerOptions: Partial<
  Record<EventListener['eventName'], EventListener['options']>
> = {};

export const makeEventListeners = (): ReadonlyArray<EventListener> => {
  return (
    Object.entries(callbacksMap) as Array<
      [EventListener['eventName'], EventListenerCallBack]
    >
  ).flatMap(([eventName, listener]) => [
    {
      eventName,
      options: listenerOptions[eventName],
      callback: listener,
    },
  ]);
};

export const syncWithPastEvents = async ({
  contract,
  fromBlock,
  toBlock,
  fromTxIndex,
  toTxIndex,
  createdAt,
  updatedAt,
}: SyncWithPastEventsProps) => {
  await Promise.all(
    (
      Object.entries(callbacksMap) as Array<
        [EventListener['eventName'], EventListenerCallBack]
      >
    ).flatMap(async ([eventName, listener]) => {
      const pastEvents = await contract.self.getPastEvents(eventName, {
        fromBlock,
        toBlock,
      });

      return pastEvents.length
        ? pastEvents
            .filter(event => {
              const meetsLowerLimit =
                event.blockNumber !== fromBlock ||
                (event.blockNumber === fromBlock &&
                  event.transactionIndex >= fromTxIndex);

              const meetsUpperLimit =
                event.blockNumber !== toBlock ||
                (event.blockNumber === toBlock &&
                  (!toTxIndex ||
                    ((toTxIndex || toTxIndex === 0) &&
                      event.transactionIndex <= toTxIndex)));

              return meetsLowerLimit && meetsUpperLimit;
            })
            .map(event =>
              listener(null, event, {
                createdAt: createdAt && addMilliseconds(createdAt, 100),
                updatedAt: updatedAt && addMilliseconds(updatedAt, 100),
              })
            )
        : [];
    })
  );
};

export const listenersInit = async () => {
  /**
   * 1. Get the info of last block (blockNumber, lastTxIndex)
   * from the App Database before starting the listeners
   */

  const [transactionBlockStatus] = await db.transactionBlockStatus.findMany({
    where: {},
    orderBy: {
      blockNumber: 'desc',
      txIndex: 'desc',
    },
  });
  const { blockNumber, txIndex, createdAt, updatedAt } =
    transactionBlockStatus ?? {
      blockNumber: 0,
      txIndex: 0,
    };

  const sablier = await startContract();

  /**
   * 2. Get the info of last block (blockNumber, lastTxIndex) from the Ethereum Network (Blockchain)
   * to be faced against the info coming from database and determine
   * if there was missed events were listeners were down
   * and if it need to sync the App Database with the Ethereum Network (Blockchain)
   */
  //
  const currentBlockNumber = await sablier.web3.eth.getBlockNumber();
  const currentBlockTransactionCount =
    await sablier.web3.eth.getBlockTransactionCount(currentBlockNumber);

  /**
   * 3. Register the listeners (set to UP!!!)
   */

  registerEventListeners(sablier.contract, ...makeEventListeners());

  /**
   * 4. If there is a lack on events timeline between the App Database and the Ethereum Network (Blockchain), Sync...
   */

  if (
    blockNumber !== currentBlockNumber ||
    txIndex !== currentBlockTransactionCount
  ) {
    await syncWithPastEvents({
      contract: sablier.contract,
      fromBlock: blockNumber,
      toBlock: currentBlockNumber,
      fromTxIndex: txIndex + 1,
      toTxIndex: currentBlockTransactionCount,
      createdAt,
      updatedAt,
    });
  }
};
