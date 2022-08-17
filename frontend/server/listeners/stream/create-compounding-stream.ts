import { EventListenerCallBack } from 'paystream-sdk/src';
import { scribal } from '../../services/logger';

export const createCompoundingStreamListener: EventListenerCallBack = async (
  error,
  event
) => {
  if (error) {
    scribal.e('Something went wrong on createCompoundingStreamListener', error);
  } else {
    scribal.i('Compounding Stream Created');
  }
};
