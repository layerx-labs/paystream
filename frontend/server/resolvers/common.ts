import {
  IResolver,
  ListQueryPageInfoProps,
  ListQueryProps,
} from './resolvers-types';

export function list({
  model,
  defaultPerPage,
  defaultOrder,
  whereHook,
  validationHook,
  select,
}: ListQueryProps): IResolver {
  return async (parent, args, ctx, info) => {
    const page = args.page ?? 0;
    const orderBy = args.orderBy ?? defaultOrder ?? { createdAt: 'desc' };
    const perPage = args.perPage ?? defaultPerPage ?? 20;
    const where = whereHook
      ? whereHook({ args, ctx, parent, info })
      : args.where;
    if (validationHook) {
      await validationHook({ args, ctx, parent, info });
    }

    return await ctx.db[model].findMany({
      where: where,
      page,
      perPage,
      orderBy,
      info,
      select,
    });
  };
}

export function listPageInfo({
  model,
  defaultPerPage,
  defaultOrder,
  whereHook,
  validationHook,
}: ListQueryPageInfoProps): IResolver {
  return async (parent, args, ctx) => {
    const perPage = args.perPage ?? defaultPerPage ?? 20;
    const orderBy = args.orderBy ?? defaultOrder ?? { createdAt: 'desc' };
    const where = whereHook ? whereHook({ args, ctx, parent }) : args.where;
    if (validationHook) {
      await validationHook({ args, ctx, parent });
    }
    return await ctx.db[model].findManyPageInfo({
      where: where,
      perPage,
      orderBy,
    });
  };
}
