import { db } from '../services/database';
import { Context, IMakeContextProps } from './graphql-types';

export const makeContext = async ({
  req,
}: IMakeContextProps): Promise<Context> => ({ db, req });
