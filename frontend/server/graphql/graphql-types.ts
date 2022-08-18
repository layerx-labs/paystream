import { NextRequest } from 'next/server';
import { db } from '../services/database';

export type Context = {
  req: NextRequest;
  db: typeof db;
};

export interface IMakeContextProps {
  req: NextRequest;
}
