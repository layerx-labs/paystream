import { QueryWithdrawFromStreamArgs } from '../../../types/graphql-generated-types';
import CustomError, {
  ApiErrorsStatusCode,
  ApiErrorsType,
} from '../../errors/custom-error';
import { IResolver } from '../resolvers-types';

export const withdrawFromStream: IResolver<
  QueryWithdrawFromStreamArgs
> = async (_, { id }, ctx, info) => {
  const withdrawFromStream = await ctx.db.withdrawFromStream.find({
    where: { id },
    info,
  });

  if (!withdrawFromStream) {
    throw new CustomError({
      code: ApiErrorsStatusCode.ObjectNotFound,
      type: ApiErrorsType.UserInputError,
      message: 'The provided withdrawFromStream id was not found',
      details: {
        id: 'withdrawFromStream not found',
      },
    });
  }
  return withdrawFromStream;
};
