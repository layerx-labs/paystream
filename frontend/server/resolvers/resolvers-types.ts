import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../graphql/graphql-types';
import { Sort } from '../services/database/database-types';

export type ResolverProps<Args = Record<string, any>> = {
  parent: Record<string, any>;
  args: Args;
  ctx: Context;
  info: GraphQLResolveInfo;
};

export type IResolver<Args = Record<string, any>> = (
  parent: ResolverProps['parent'],
  args: ResolverProps<Args>['args'],
  ctx: ResolverProps['ctx'],
  info: ResolverProps['info']
) => Promise<any>;

export type ListQueryProps = {
  model: keyof Omit<Context['db'], '_orm'>;
  defaultPerPage?: number;
  defaultOrder?: Sort;
  whereHook?<Args = Record<string, any>>(
    props: Partial<ResolverProps<Args>>
  ): Record<string, any>;
  validationHook?<Args = Record<string, any>>(
    props: Partial<ResolverProps<Args>>
  ): Promise<void>;
  select?: Record<string, any>;
};

export type ListQueryPageInfoProps = {
  model: keyof Omit<Context['db'], '_orm'>;
  defaultPerPage?: number;
  defaultOrder?: Sort;
  whereHook?<Args = Record<string, any>>(
    props: Partial<ResolverProps<Args>>
  ): Record<string, any>;
  validationHook?<Args = Record<string, any>>(
    props: Partial<ResolverProps<Args>>
  ): Promise<void>;
};
