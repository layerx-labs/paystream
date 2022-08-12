import { PrismaSelect } from '@paljs/plugins';
import { PrismaClient, Prisma } from '@prisma/client';
import CustomError, {
  ApiErrorsStatusCode,
  ApiErrorsType,
} from '../../errors/custom-error';
import {
  IErrorHandler,
  InfoToSelect,
  IOrmError,
  OrmErrorProps,
  TagToSelect,
} from './database-types';

declare global {
  // eslint-disable-next-line no-var
  var prismaClient: PrismaClient | undefined;
}

export const prismaClient =
  global.prismaClient ||
  new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  });

if (process.env.NODE_ENV !== 'production') global.prismaClient = prismaClient;

type PrismaClientKnownRequestErrorCode = 'errorP2003';

export class ErrorHandler implements IErrorHandler {
  static errorP2003(e: IOrmError, operation: string) {
    const field = e.meta?.['field_name'].match(/^[a-zA-Z]+/)?.[0] ?? '0';
    return new CustomError({
      code: ApiErrorsStatusCode.InvalidUserInput,
      type: ApiErrorsType.InternalError,
      message: `${operation.toUpperCase()} Failed`,
      details: {
        [field]: `Could not ${operation} this row cause there is related data, ${operation} all ${field}s first`,
      },
    });
  }

  errorHandler({ error, operation }: OrmErrorProps): CustomError {
    const defaultError = new CustomError({
      code: ApiErrorsStatusCode.InvalidUserInput,
      type: ApiErrorsType.InternalError,
      message: `${operation.toUpperCase()} Failed`,
      details: error,
    });
    return error instanceof Prisma.PrismaClientKnownRequestError
      ? ErrorHandler[`error${error.code}` as PrismaClientKnownRequestErrorCode](
          error,
          operation
        )
      : defaultError;
  }
}

class TagToPrismaAdapter {
  _tag;
  constructor(tag: any) {
    this._tag = tag;
  }

  buildArgumentObject(field: Record<string, any>) {
    if (
      field.kind === 'ObjectField' &&
      field.value &&
      field.value.kind === 'IntValue'
    ) {
      return { [field.name.value]: parseInt(field.value.value) };
    }

    if (
      field.kind === 'ObjectField' &&
      field.value &&
      field.value.kind === 'FloatValue'
    ) {
      return { [field.name.value]: parseFloat(field.value.value) };
    }
    if (
      field.kind === 'ObjectField' &&
      field.value &&
      field.value.kind === 'BooleanValue'
    ) {
      return { [field.name.value]: field.value.value };
    }
    if (
      field.kind === 'ObjectField' &&
      field.value &&
      field.value.kind === 'StringValue'
    ) {
      return { [field.name.value]: field.value.value };
    }
    if (
      field.kind === 'ObjectField' &&
      field.value &&
      field.value.kind === 'EnumValue'
    ) {
      return { [field.name.value]: field.value.value };
    }

    if (field.kind === 'IntValue') {
      return parseInt(field.value);
    }

    if (field.kind === 'StringValue') {
      return field.value;
    }
    if (field.kind === 'EnumValue') {
      return field.value;
    }

    if (field.kind === 'BooleanValue') {
      return field.value;
    }

    if (field.kind === 'FloatValue') {
      return parseFloat(field.value);
    }

    if (field.kind === 'Argument' && field.value.kind === 'ObjectValue') {
      return field.value.fields.reduce(
        (obj: Record<string, any>, child: Record<string, any>) => ({
          ...obj,
          ...this.buildArgumentObject(child),
        }),
        {}
      );
    }
    if (field.kind === 'ObjectField' && field.value.kind === 'ListValue') {
      return {
        [field.name.value]: field.value.values.map(
          (child: Record<string, any>) => this.buildArgumentObject(child)
        ),
      };
    }

    if (field.kind === 'ObjectField' && field.value.kind === 'ObjectValue') {
      return field.value.fields.reduce(
        (object: Record<string, any>, arg: Record<string, any>) => ({
          ...object,
          [field.name.value]: this.buildArgumentObject(arg),
        }),
        {}
      );
    }
    if (field.kind === 'Argument' && field.value.kind === 'ListValue') {
      return field.value.values.map((child: Record<string, any>) =>
        this.buildArgumentObject(child)
      );
    }
  }

  buildPrismaObject(item: Record<string, any>) {
    const selectSetToObj = (selectionSet: Record<string, any>) =>
      selectionSet.selections.reduce(
        (object: Record<string, any>, item: Record<string, any>) => ({
          ...object,
          ...this.buildPrismaObject(item),
        }),
        {}
      );
    if (item.selectionSet && item.name && item.name.value) {
      const args = item.arguments
        ? item.arguments.reduce(
            (object: Record<string, any>, arg: Record<string, any>) => ({
              ...object,
              [arg.name.value]: this.buildArgumentObject(arg),
            }),
            {}
          )
        : {};
      return {
        [item.name.value]: {
          ...args,
          select: {
            ...selectSetToObj(item.selectionSet),
          },
        },
      };
    } else if (item.selectionSet) {
      return {
        select: {
          ...selectSetToObj(item.selectionSet),
        },
      };
    }
    return {
      [item.name.value]: true,
    };
  }

  toPrisma() {
    const operation = this._tag.definitions.find(
      (args: Record<string, any>) => args.kind === 'OperationDefinition'
    );
    return this.buildPrismaObject(operation);
  }
}

export const infoToSelect: InfoToSelect = (info: any) =>
  new PrismaSelect(info).value;

export const tagToSelect: TagToSelect = (gqlTag: any) =>
  new TagToPrismaAdapter(gqlTag).toPrisma();

export const selectParser: TagToSelect = (
  select: Record<string | number, any>
) => select;
