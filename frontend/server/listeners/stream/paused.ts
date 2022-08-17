import { EventListenerCallBack } from 'paystream-sdk/src';
import { scribal } from '../../services/logger';

export const pausedListener: EventListenerCallBack = async (error, event) => {
  if (error) {
    scribal.e('Something went wrong pausing the stream', error);
  } else {
    scribal.i('Stream cancelled');
  }
};
