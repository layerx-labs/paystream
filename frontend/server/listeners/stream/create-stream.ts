import { EventListenerCallBack, CreateStreamEvent } from 'paystream-sdk/src';
import { db } from '../../services/database';
import { scribal } from '../../services/logger';

export const createStreamListener: EventListenerCallBack = async (
  error,
  event
) => {
  if (error) {
    scribal.e('Something went wrong on createStreamListener', error);
  } else {
    createStreamFromEventData(
      event.returnValues as CreateStreamEvent['returnValues']
    ).then();
    scribal.i('Stream created', event.returnValues);
  }
};

async function createStreamFromEventData(
  returnValues: CreateStreamEvent['returnValues']
) {
  return await db.stream.create({
    data: {
      ...returnValues,
      startTime: new Date(returnValues.startTime),
      stopTime: new Date(returnValues.stopTime),
    },
  });
}
