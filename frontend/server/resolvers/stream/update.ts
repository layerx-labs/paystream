import { MutationUpdateStreamArgs } from '../../../types/graphql-generated-types';
import { IResolver } from '../resolvers-types';

export const updateStream: IResolver<MutationUpdateStreamArgs> = async (
  _,
  { data, id },
  ctx,
  info
) => {
  try {
    const stream = await ctx.db.stream.update({
      where: { id },
      data,
      info,
    });

    return stream;
  } catch (error: any) {
    throw ctx.db._orm.errorHandler({ error, operation: 'Updating Stream' });
  }
};
