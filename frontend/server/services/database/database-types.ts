import { Prisma } from '@prisma/client';
import CustomError from '../../errors/custom-error';
import {
  GeneratedCreateInputs,
  GeneratedUpdateInputs,
  GeneratedWhereInputs,
  GeneratedSelects,
  GeneratedEntities,
} from './entity-inputs';

export interface IOrmError {
  code: string;
  message?: string;
  meta?: Record<string, any>;
  cause?: string;
  clientVersion?: string;
}

type Select<T = any> = {
  select: T;
};

export type Sort = Record<string, 'asc' | 'desc'>;

export type ISelectionSetProps<S = any> = {
  info?: Record<string, any>;
  gql?: any;
} & Partial<Select<S>>;

export interface IOrmAdapterMethodsProps<
  WhereInput = any,
  CreateInput = any,
  UpdateInput = any,
  Select = any
> {
  create: {
    data: CreateInput;
  } & ISelectionSetProps<Select>;
  createMany: {
    data: CreateInput | ReadonlyArray<CreateInput>;
  } & ISelectionSetProps<Select>;
  findMany: {
    where: WhereInput;
    orderBy?: Sort;
    page?: number;
    perPage?: number;
  } & ISelectionSetProps<Select>;
  findManyPageInfo: {
    where: WhereInput;
    perPage?: number;
    orderBy?: Sort;
  };
  find: {
    where: WhereInput;
  } & ISelectionSetProps<Select>;
  update: {
    data: UpdateInput;
    where: WhereInput;
  } & ISelectionSetProps<Select>;
  updateMany: {
    data: UpdateInput;
    where: WhereInput;
  } & ISelectionSetProps<Select>;
  delete: {
    where: WhereInput;
  } & ISelectionSetProps<Select>;
  deleteMany: {
    where: WhereInput;
  } & ISelectionSetProps<Select>;
  upsert: {
    where: WhereInput;
    update: UpdateInput;
    create: CreateInput;
  } & ISelectionSetProps<Select>;
  count: {
    where?: WhereInput;
  };
}

export interface IOrmAdapter<
  WhereInput = any,
  CreateInput = any,
  UpdateInput = any,
  Select = any,
  Entity = any
> {
  findMany(
    props: IOrmAdapterMethodsProps<
      WhereInput,
      CreateInput,
      UpdateInput,
      Select
    >['findMany']
  ): Promise<Array<Entity>>;
  findManyPageInfo(
    props: IOrmAdapterMethodsProps<
      WhereInput,
      CreateInput,
      UpdateInput,
      Select
    >['findManyPageInfo']
  ): Promise<{
    perPage: number;
    recordCount: number;
    pageCount: number;
  }>;
  find(
    props: IOrmAdapterMethodsProps<
      WhereInput,
      CreateInput,
      UpdateInput,
      Select
    >['find']
  ): Promise<Entity>;
  count(
    props: IOrmAdapterMethodsProps<
      WhereInput,
      CreateInput,
      UpdateInput,
      Select
    >['count']
  ): Promise<number>;
  create(
    props: IOrmAdapterMethodsProps<
      WhereInput,
      CreateInput,
      UpdateInput,
      Select
    >['create']
  ): Promise<Entity>;
  createMany(
    props: IOrmAdapterMethodsProps<
      WhereInput,
      CreateInput,
      UpdateInput,
      Select
    >['createMany']
  ): Promise<{ count: number }>;
  update(
    props: IOrmAdapterMethodsProps<
      WhereInput,
      CreateInput,
      UpdateInput,
      Select
    >['update']
  ): Promise<Entity>;
  deleteMany(
    props: IOrmAdapterMethodsProps<
      WhereInput,
      CreateInput,
      UpdateInput,
      Select
    >['deleteMany']
  ): Promise<{ count: number }>;
  delete(
    props: IOrmAdapterMethodsProps<
      WhereInput,
      CreateInput,
      UpdateInput,
      Select
    >['delete']
  ): Promise<Entity>;
  updateMany(
    props: IOrmAdapterMethodsProps<
      WhereInput,
      CreateInput,
      UpdateInput,
      Select
    >['updateMany']
  ): Promise<{ count: number }>;
  upsert(
    props: IOrmAdapterMethodsProps<
      WhereInput,
      CreateInput,
      UpdateInput,
      Select
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
  errorHandler: IErrorHandler['errorHandler'];
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
export type TagToSelect = (gqlTag: any) => Record<string | number, any>;
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
  [Property in keyof T]: IOrmAdapter<
    Property extends keyof GeneratedWhereInputs
      ? GeneratedWhereInputs[Property]
      : any,
    Property extends keyof GeneratedCreateInputs
      ? GeneratedCreateInputs[Property]
      : any,
    Property extends keyof GeneratedUpdateInputs
      ? GeneratedUpdateInputs[Property]
      : any,
    Property extends keyof GeneratedSelects ? GeneratedSelects[Property] : any,
    Property extends keyof GeneratedEntities
      ? GeneratedEntities[Property] & { [key: string]: any }
      : any
  >;
};

export type IDatabaseManager<T> = IMapModelNames<IModelsNames<T>>;
