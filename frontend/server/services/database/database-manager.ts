import { camelize } from '../../../utils/string';
import {
  DatabaseManagerProps,
  IErrorHandler,
  IOrmAdapter,
} from './database-types';

class DatabaseManager<T> {
  private orm: T & IErrorHandler;
  constructor({
    orm,
    makeOrmAdapter,
    modelsNames,
    errorHandler,
    infoToSelect,
    tagToSelect,
    selectParser,
  }: DatabaseManagerProps<T>) {
    this.orm = { ...orm, ...errorHandler };

    for (const key in modelsNames) {
      if (Object.hasOwnProperty.call(modelsNames, key)) {
        const modelCamel = camelize(modelsNames[key]);
        (this as any)[modelCamel] = makeOrmAdapter({
          delegate: orm[modelCamel as keyof T],
          infoToSelect,
          tagToSelect,
          selectParser,
        });
      }
    }
  }
}

// function makeDatabaseManager<T>({
//   orm,
//   makeOrmAdapter,
//   modelsNames,
//   errorHandler,
//   infoToSelect,
//   tagToSelect,
//   selectParser,
// }: DatabaseManagerProps<T>) {
//   const databaseManager : Record<`${keyof modelsNames}`, any> =  {
//     // _orm: { ...orm, ...errorHandler },
//   };

//   for (const key in modelsNames) {
//     if (Object.hasOwnProperty.call(modelsNames, key)) {
//       const modelCamel = camelize(modelsNames[key]);
//       databaseManager[modelCamel] = makeOrmAdapter({
//         delegate: orm[modelCamel as keyof T],
//         infoToSelect,
//         tagToSelect,
//         selectParser,
//       });
//     }
//   }

//   return databaseManager;
// }

export default DatabaseManager;
