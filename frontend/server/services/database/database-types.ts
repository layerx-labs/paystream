import CustomError from '../errors/custom-error';

export interface IOrmError {
  code: string;
  message?: string;
  meta?: Record<string, any>;
  cause?: string;
  clientVersion?: string;
}

export interface IOrmAdapterMethodsProps {
  findMany: {
    where: Record<string, any>;
    orderBy: Record<string, any>;
    page?: number;
    perPage?: number;
    info?: Record<string, any> | null;
    gql?: any;
    select: Record<string, any>;
  };
}

export interface IOrmAdapter {
  new (args: OrmAdapterProps): void;
  findMany(props: IOrmAdapterMethodsProps['findMany']): Promise<any>;
  findManyPageInfo(): Promise<any>;
  find(): Promise<any>;
  count(): Promise<any>;
  create(): Promise<any>;
  createMany(): Promise<any>;
  update(): Promise<any>;
  deleteMany(): Promise<any>;
  updateMany(): Promise<any>;
  upsert(): Promise<any>;
  aggregate(): Promise<any>;
  groupBy(): Promise<any>;
}

export type OrmErrorProps = {
  error: IOrmError;
  operation: string;
};

export type DatabaseManagerProps<T> = {
  orm: T;
  OrmAdapter: IOrmAdapter;
  modelsNames: Record<string, string>;
  errorHandler: IErrorHandler;
  infoToSelect: InfoToSelect;
  tagToSelect: TagToSelect;
};

export type OrmAdapterProps = {
  delegate: Record<string, any>;
  modelName?: string;
  infoToSelect: InfoToSelect;
  tagToSelect: TagToSelect;
};

export interface IErrorHandler {
  errorHandler(args: OrmErrorProps): CustomError;
}

export type InfoToSelect = (info: any) => Record<string, any>;
export type TagToSelect = (info: any) => Record<string, any>;
