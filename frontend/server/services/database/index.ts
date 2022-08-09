import { Prisma } from '@prisma/client';
import DatabaseManager from './database-manager';
import makeOrmAdapter from './orm-adapter';
import {
  ErrorHandler,
  infoToSelect,
  tagToSelect,
  prismaClient,
  selectParser,
} from './prisma-orm';

const c = new DatabaseManager({
  orm: prismaClient,
  errorHandler: new ErrorHandler(),
  infoToSelect,
  tagToSelect,
  selectParser,
  modelsNames: Prisma.ModelName,
  makeOrmAdapter,
});
