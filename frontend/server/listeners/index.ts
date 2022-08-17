import { EventListener, EventListenerCallBack } from 'paystream-sdk/src';
import { cancelStreamListener } from './stream/cancel-stream';
import { createCompoundingStreamListener } from './stream/create-compounding-stream';
import { createStreamListener } from './stream/create-stream';
import { ownershipTransferredListener } from './stream/ownership-transferred';
import { pausedListener } from './stream/paused';
import { unpausedListener } from './stream/unpaused';
import { withdrawFromStreamListener } from './stream/withdraw-from-stream';

const callbacksMap: Partial<
  Record<EventListener['eventName'], EventListenerCallBack>
> = {
  CancelStream: cancelStreamListener,
  CreateCompoundingStream: createCompoundingStreamListener,
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
