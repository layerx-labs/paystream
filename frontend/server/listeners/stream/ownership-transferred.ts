import { EventListenerCallBack } from 'paystream-sdk/src';
import { scribal } from '../../services/logger';

export const ownershipTransferredListener: EventListenerCallBack = async (
  error,
  event
) => {
  if (error) {
    scribal.e('Something went wrong on ownershipTransferredListener', error);
  } else {
    scribal.i('Stream ownership transferred');
  }
};
