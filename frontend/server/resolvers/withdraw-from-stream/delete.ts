import { MutationDeleteWithdrawFromStreamArgs } from '../../../types/graphql-generated-types';
import { IResolver } from '../resolvers-types';

export const deleteWithdrawFromStream: IResolver<
  MutationDeleteWithdrawFromStreamArgs
> = async (_, { id }, ctx, info) => {
  try {
    const withdraw = await ctx.db.withdrawFromStream.delete({
      where: { id },
      info,
    });

    return withdraw;
  } catch (error: any) {
    throw ctx.db._orm.errorHandler({
      error,
      operation: 'Deleting Withdraw from Stream',
    });
  }
};
