import { scribal } from '../../services/logger';
import { EventListenerCallBack } from '../listeners-type';

export const pausedListener: EventListenerCallBack = async (error, event) => {
  if (error) {
    scribal.e('Something went wrong pausing the stream', error);
  } else {
    scribal.i('Stream cancelled');
  }
};
