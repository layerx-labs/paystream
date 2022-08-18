import { MutationDeleteStreamArgs } from '../../../types/graphql-generated-types';
import { IResolver } from '../resolvers-types';

export const deleteStream: IResolver<MutationDeleteStreamArgs> = async (
  _,
  { id },
  ctx,
  info
) => {
  try {
    const stream = await ctx.db.stream.update({
      where: { id },
      data: {
        status: {
          set: 'CANCELED',
        },
      },
      info,
    });

    return stream;
  } catch (error: any) {
    throw ctx.db._orm.errorHandler({ error, operation: 'Deleting Stream' });
  }
};
