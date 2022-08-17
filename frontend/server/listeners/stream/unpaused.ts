import { EventListenerCallBack } from 'paystream-sdk/src';
import { scribal } from '../../services/logger';

export const unpausedListener: EventListenerCallBack = async (error, event) => {
  if (error) {
    scribal.e('Something went wrong on unpausedListener', error);
  } else {
    scribal.i('Stream unpaused');
  }
};
