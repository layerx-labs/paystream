import CustomError from '../errors/custom-error';

export interface IOrmError {
  code: string;
  message?: string;
  meta?: Record<string, any>;
  cause?: string;
  clientVersion?: string;
}

export interface ISelectionSetProps {
  info?: any;
  gql?: any;
  select?: Record<string | number, any>;
}

export interface IOrmAdapterMethodsProps {
  create: {
    data: Record<string, any>;
    info?: Record<string, any>;
    gql?: any;
    select?: Record<string, any>;
  };
  createMany: {
    data: Record<string, any>;
    info?: Record<string, any>;
    gql?: any;
    select?: Record<string, any>;
  };
  findMany: {
    where: Record<string, any>;
    orderBy?: Record<string, any>;
    page?: number;
    perPage?: number;
    info?: Record<string, any>;
    gql?: any;
    select?: Record<string, any>;
  };
  findManyPageInfo: {
    where: Record<string, any>;
    perPage?: number;
  };
  find: {
    where: Record<string, any>;
    info?: Record<string, any>;
    gql?: any;
    select?: Record<string, any>;
  };
  update: {
    data: Record<string, any>;
    where: Record<string, any>;
    info?: Record<string, any>;
    gql?: any;
    select?: Record<string, any>;
  };
  updateMany: {
    data: Record<string, any>;
    where: Record<string, any>;
    info?: Record<string, any>;
    gql?: any;
    select?: Record<string, any>;
  };
  delete: {
    where: Record<string, any>;
    info?: Record<string, any>;
    gql?: any;
    select?: Record<string, any>;
  };
  deleteMany: {
    where: Record<string, any>;
    info?: Record<string, any>;
    gql?: any;
    select?: Record<string, any>;
  };
  upsert: {
    where: Record<string, any>;
    update: Record<string, any>;
    create: Record<string, any>;
    info?: Record<string, any>;
    gql?: any;
    select?: Record<string, any>;
  };
  count: {
    where?: Record<string, any>;
  };
}

export interface IOrmAdapter {
  findMany<E = any>(
    props: IOrmAdapterMethodsProps['findMany']
  ): Promise<Array<E>>;
  findManyPageInfo(
    props: IOrmAdapterMethodsProps['findManyPageInfo']
  ): Promise<{
    perPage: number;
    recordCount: number;
    pageCount: number;
  }>;
  find<E = any>(props: IOrmAdapterMethodsProps['find']): Promise<E>;
  count(props: IOrmAdapterMethodsProps['count']): Promise<number>;
  create<E = any>(props: IOrmAdapterMethodsProps['create']): Promise<E>;
  createMany(
    props: IOrmAdapterMethodsProps['createMany']
  ): Promise<{ count: number }>;
  update<E = any>(props: IOrmAdapterMethodsProps['update']): Promise<E>;
  deleteMany(
    props: IOrmAdapterMethodsProps['deleteMany']
  ): Promise<{ count: number }>;
  updateMany(
    props: IOrmAdapterMethodsProps['updateMany']
  ): Promise<{ count: number }>;
  upsert(props: IOrmAdapterMethodsProps['upsert']): Promise<any>;
}

export type OrmErrorProps = {
  error: IOrmError;
  operation: string;
};

export type DatabaseManagerProps<T> = {
  orm: T;
  makeOrmAdapter(props: OrmAdapterProps): IOrmAdapter;
  modelsNames: Record<string, string>;
  errorHandler: IErrorHandler;
  infoToSelect: InfoToSelect;
  tagToSelect: TagToSelect;
  selectParser: SelectParser;
};

export type OrmAdapterProps = {
  delegate: Record<string, any>;
  modelName?: string;
  infoToSelect: InfoToSelect;
  tagToSelect: TagToSelect;
  selectParser: SelectParser;
};

export interface IErrorHandler {
  errorHandler(args: OrmErrorProps): CustomError;
}

export type InfoToSelect = (info: any) => Record<string | number, any>;
export type TagToSelect = (info: any) => Record<string | number, any>;
export type SelectParser = (
  select: Record<string | number, any>
) => Record<string | number, any>;
