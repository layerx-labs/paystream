import { camelize } from '../../../utils/string';
import { DatabaseManagerProps, IErrorHandler } from './database-types';

class DatabaseManager<T> {
  private orm: T & IErrorHandler;
  constructor({
    orm,
    OrmAdapter,
    modelsNames,
    errorHandler,
    infoToSelect,
    tagToSelect,
  }: DatabaseManagerProps<T>) {
    this.orm = { ...orm, ...errorHandler };

    for (const key in modelsNames) {
      if (Object.hasOwnProperty.call(modelsNames, key)) {
        const modelCamel = camelize(modelsNames[key]);
        (this as Record<string, any>)[modelCamel] = new OrmAdapter({
          delegate: orm[modelCamel as keyof T],
          infoToSelect,
          tagToSelect,
        });
      }
    }
  }
}

export default DatabaseManager;
