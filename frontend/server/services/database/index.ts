import { Prisma } from '@prisma/client';
import makeDatabaseManager from './database-manager';
import makeOrmAdapter from './orm-adapter';
import {
  ErrorHandler,
  infoToSelect,
  tagToSelect,
  prismaClient,
  selectParser,
} from './prisma-orm';
const errorHandler = new ErrorHandler().errorHandler;

export const db = makeDatabaseManager({
  orm: prismaClient,
  errorHandler,
  infoToSelect,
  tagToSelect,
  selectParser,
  modelsNames: Prisma.ModelName,
  makeOrmAdapter,
});
