import { Prisma } from '@prisma/client';
import CustomError from '../errors/custom-error';

export interface IOrmError {
  code: string;
  message?: string;
  meta?: Record<string, any>;
  cause?: string;
  clientVersion?: string;
}

type Select = {
  select: Record<string, boolean | Select>;
};

export type ISelectionSetProps = {
  info?: Record<string, any>;
  gql?: any;
} & Partial<Select>;

export interface IOrmAdapterMethodsProps<
  WhereInput = any,
  CreateInput = any,
  UpdateInput = any
> {
  create: {
    data: CreateInput;
  } & ISelectionSetProps;
  createMany: {
    data: CreateInput | ReadonlyArray<CreateInput>;
  } & ISelectionSetProps;
  findMany: {
    where: WhereInput;
    orderBy?: Record<string, any>;
    page?: number;
    perPage?: number;
  } & ISelectionSetProps;
  findManyPageInfo: {
    where: WhereInput;
    perPage?: number;
  };
  find: {
    where: WhereInput;
  } & ISelectionSetProps;
  update: {
    data: UpdateInput;
    where: WhereInput;
  } & ISelectionSetProps;
  updateMany: {
    data: UpdateInput;
    where: WhereInput;
  } & ISelectionSetProps;
  delete: {
    where: WhereInput;
  } & ISelectionSetProps;
  deleteMany: {
    where: WhereInput;
  } & ISelectionSetProps;
  upsert: {
    where: WhereInput;
    update: UpdateInput;
    create: CreateInput;
  } & ISelectionSetProps;
  count: {
    where?: WhereInput;
  };
}

export interface IOrmAdapter {
  findMany<WhereInput = any, Entity = any>(
    props: IOrmAdapterMethodsProps<WhereInput, any, any>['findMany']
  ): Promise<Array<Entity>>;
  findManyPageInfo<WhereInput = any>(
    props: IOrmAdapterMethodsProps<WhereInput, any, any>['findManyPageInfo']
  ): Promise<{
    perPage: number;
    recordCount: number;
    pageCount: number;
  }>;
  find<WhereInput = any, Entity = any>(
    props: IOrmAdapterMethodsProps<WhereInput, any, any>['find']
  ): Promise<Entity>;
  count<WhereInput = any>(
    props: IOrmAdapterMethodsProps<WhereInput, any, any>['count']
  ): Promise<number>;
  create<CreateInput = any, Entity = any>(
    props: IOrmAdapterMethodsProps<any, CreateInput, any>['create']
  ): Promise<Entity>;
  createMany<CreateInput = any>(
    props: IOrmAdapterMethodsProps<any, CreateInput, any>['createMany']
  ): Promise<{ count: number }>;
  update<WhereInput = any, UpdateInput = any, Entity = any>(
    props: IOrmAdapterMethodsProps<WhereInput, any, UpdateInput>['update']
  ): Promise<Entity>;
  deleteMany<WhereInput = any>(
    props: IOrmAdapterMethodsProps<WhereInput, any, any>['deleteMany']
  ): Promise<{ count: number }>;
  delete<WhereInput = any, Entity = any>(
    props: IOrmAdapterMethodsProps<WhereInput, any, any>['delete']
  ): Promise<Entity>;
  updateMany<WhereInput = any, UpdateInput = any>(
    props: IOrmAdapterMethodsProps<WhereInput, any, UpdateInput>['updateMany']
  ): Promise<{ count: number }>;
  upsert<WhereInput = any, CreateInput = any, UpdateInput = any, Entity = any>(
    props: IOrmAdapterMethodsProps<
      WhereInput,
      CreateInput,
      UpdateInput
    >['upsert']
  ): Promise<Entity>;
}

export type OrmErrorProps = {
  error: IOrmError;
  operation: string;
};

export type DatabaseManagerProps<T> = {
  orm: T;
  makeOrmAdapter(props: OrmAdapterProps): IOrmAdapter;
  modelsNames: typeof Prisma.ModelName;
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

type HeadLetter<T> = T extends `${infer FirstLetter}${infer _Rest}`
  ? FirstLetter
  : never;
type TailLetters<T> = T extends `${infer _FirstLetter}${infer Rest}`
  ? Rest
  : never;

type CamelCase<S extends string> = `${Lowercase<
  HeadLetter<S>
>}${TailLetters<S>}`;

export type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends {}
    ? KeysToCamelCase<T[K]>
    : T[K];
};

export type IModelsNames<T> = KeysToCamelCase<T>;

type IMapModelNames<T> = {
  [Property in keyof T]: IOrmAdapter;
};

export type IDatabaseManager<T> = IMapModelNames<IModelsNames<T>>;
