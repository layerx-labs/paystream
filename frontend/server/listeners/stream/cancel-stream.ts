import { scribal } from '../../services/logger';
import { EventListenerCallBack } from '../listeners-type';

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
