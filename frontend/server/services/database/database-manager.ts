import { camelize } from '../../../utils/string';
import {
  DatabaseManagerProps,
  IDatabaseManager,
  IErrorHandler,
  IModelsNames,
} from './database-types';

function makeDatabaseManager<T>({
  orm,
  makeOrmAdapter,
  modelsNames,
  errorHandler,
  infoToSelect,
  tagToSelect,
  selectParser,
}: DatabaseManagerProps<T>) {
  const databaseManager = Object.keys(modelsNames).reduce(
    (acc, key) => {
      if (Object.hasOwnProperty.call(modelsNames, key)) {
        const modelCamel = camelize(
          modelsNames[key as keyof typeof modelsNames]
        );
        return {
          ...acc,
          [modelCamel as keyof IModelsNames<typeof modelsNames>]:
            makeOrmAdapter({
              delegate: orm[modelCamel as keyof T],
              infoToSelect,
              tagToSelect,
              selectParser,
            }),
        };
      }
      return acc;
    },
    {
      _orm: { ...orm, ...errorHandler },
    }
  ) as IDatabaseManager<typeof modelsNames> & {
    _orm: T & IErrorHandler;
  };

  return databaseManager;
}

export default makeDatabaseManager;
