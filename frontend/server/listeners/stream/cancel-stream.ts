import { EventListenerCallBack } from 'paystream-sdk/src';
import { scribal } from '../../services/logger';

export const cancelStreamListener: EventListenerCallBack = async (
  error,
  event
) => {
  if (error) {
    scribal.e('Something went wrong cancelling the stream', error);
  } else {
    scribal.i('Stream cancelled');
  }
};
