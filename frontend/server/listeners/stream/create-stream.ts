import { CreateStreamEvent } from 'paystream-sdk';
import { db } from '../../services/database';
import { scribal } from '../../services/logger';
import { EventListenerCallBack } from '../listeners-type';

export const createStreamListener: EventListenerCallBack = async (
  error,
  event,
  customData
) => {
  if (error) {
    scribal.e('Something went wrong on createStreamListener', error);
  } else {
    const eventReturnValues =
      event.returnValues as CreateStreamEvent['returnValues'];
    await db.stream.create({
      data: {
        ...eventReturnValues,
        startTime: new Date(eventReturnValues.startTime),
        stopTime: new Date(eventReturnValues.stopTime),
        createdAt: customData?.createdAt,
        updatedAt: customData?.updatedAt,
      },
    });

    await db.transactionBlockStatus.upsert({
      where: {
        blockNumber: { lte: event.blockNumber },
        txIndex: { lt: event.transactionIndex },
      },
      create: {
        blockNumber: event.blockNumber,
        txIndex: event.transactionIndex,
      },
      update: {
        blockNumber: event.blockNumber,
        txIndex: event.transactionIndex,
      },
    });
    scribal.i('Stream created', eventReturnValues);
  }
};
