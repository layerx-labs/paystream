import { MutationCreateStreamArgs } from '../../../types/graphql-generated-types';
import { IResolver } from '../resolvers-types';

export const createStream: IResolver<MutationCreateStreamArgs> = async (
  _,
  { data },
  ctx,
  info
) => {
  try {
    const stream = await ctx.db.stream.create({
      data: {
        ...data,
        startTime: new Date(data.startTime),
        stopTime: new Date(data.stopTime),
      },
      info,
    });

    return stream;
  } catch (error: any) {
    throw ctx.db._orm.errorHandler({ error, operation: 'Creating Stream' });
  }
};
