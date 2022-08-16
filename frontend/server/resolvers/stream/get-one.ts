import CustomError, {
  ApiErrorsStatusCode,
  ApiErrorsType,
} from '../../errors/custom-error';
import { IResolver } from '../resolvers-types';

export const stream: IResolver = async (_, { id }, ctx, info) => {
  const stream = await ctx.db.stream.find({
    where: { id },
    info,
  });

  if (!stream) {
    throw new CustomError({
      code: ApiErrorsStatusCode.ObjectNotFound,
      type: ApiErrorsType.UserInputError,
      message: 'The provided stream id was not found',
      details: {
        id: 'Stream not found',
      },
    });
  }
  return stream;
};
