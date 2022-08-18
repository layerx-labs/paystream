import { GraphQLError } from 'graphql';
import { scribal } from '../services/logger';
import CustomError from './custom-error';

export function errorHandlingFunction(err: GraphQLError) {
  if (err.originalError instanceof CustomError) {
    const detailsString = JSON.stringify(err.originalError.details);
    scribal.d(
      `Validation Error Reason={${err.originalError.message}} details={${detailsString}}`
    );
  } else {
    const reason = err.originalError ? err.originalError.message : err.message;
    const stack = err.originalError ? err.originalError.stack : err.stack;
    scribal.e(
      `Server Error on Path={${err.path}} Reason={${reason}} StackTrace={\n${stack}}`
    );
  }
  return {
    message: err.message,
    code: err.originalError && (err.originalError as CustomError).code,
    path: err.path,
    details: err.originalError && (err.originalError as CustomError).details,
  };
}
