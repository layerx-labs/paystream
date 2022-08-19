import { scribal } from '../../services/logger';
import { EventListenerCallBack } from '../listeners-type';

export const unpausedListener: EventListenerCallBack = async (error, event) => {
  if (error) {
    scribal.e('Something went wrong on unpausedListener', error);
  } else {
    scribal.i('Stream unpaused');
  }
};
