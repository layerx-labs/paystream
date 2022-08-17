import { EventListenerCallBack } from 'paystream-sdk/src';
import { scribal } from '../../services/logger';

export const withdrawFromStreamListener: EventListenerCallBack = async (
  error,
  event
) => {
  if (error) {
    scribal.e('Something went wrong on withdrawFromStreamListener', error);
  } else {
    scribal.i('Successfully withdrew from stream');
  }
};
