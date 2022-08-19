import { scribal } from '../../services/logger';
import { EventListenerCallBack } from '../listeners-type';

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
