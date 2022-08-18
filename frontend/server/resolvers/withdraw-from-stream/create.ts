import { MutationCreateWithdrawFromStreamArgs } from '../../../types/graphql-generated-types';
import { IResolver } from '../resolvers-types';

export const createWithdrawFromStream: IResolver<
  MutationCreateWithdrawFromStreamArgs
> = async (_, { data }, ctx, info) => {
  try {
    const withdraw = await ctx.db.withdrawFromStream.create({
      data,
      info,
    });

    return withdraw;
  } catch (error: any) {
    throw ctx.db._orm.errorHandler({
      error,
      operation: 'Creating Withdraw from Stream',
    });
  }
};
