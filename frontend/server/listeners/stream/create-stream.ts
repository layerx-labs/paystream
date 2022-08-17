import { EventListenerCallBack } from 'paystream-sdk/src';
import { scribal } from '../../services/logger';

export const createStreamListener: EventListenerCallBack = async (
  error,
  event
) => {
  if (error) {
    scribal.e('Something went wrong on createStreamListener', error);
  } else {
    scribal.i('Stream created', event.returnValues);
  }
};
