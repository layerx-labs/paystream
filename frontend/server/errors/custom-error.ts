export enum ApiErrorsType {
  ValidationError = 'VALIDATION_ERROR',
  UserInputError = 'USER_INPUT_ERROR',
  GenericType = 'ERROR',
  InternalError = 'INTERNAL_ERROR',
}

export enum ApiErrorsStatusCode {
  Success = 200,
  Created = 201,
  InvalidUserInput = 422,
  ObjectNotFound = 404,
}

export interface ICustomError {
  /**
   * The Http status code, for this response.
   */
  code: ApiErrorsStatusCode;
  /**
   * The type of this error, eg.: VALIDATION_ERROR; AUTHORIZATION_ERROR, USER_INPUT ...
   */
  type: ApiErrorsType;
  /**
   * The message of this error
   */
  message: string;
  /**
   * Details will be an object with unknown properties, and it will be only for develop eyes, so its messages don't need to be translated (be included in i18n approach )
   */
  details: Record<string, any>;
}

class CustomError extends Error implements ICustomError {
  code;
  details;
  type;

  constructor(props: ICustomError) {
    super(props.message);
    this.code = props.code;
    this.details = props.details;
    this.type = props.type;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
