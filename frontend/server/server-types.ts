import { IncomingMessage, ServerResponse } from 'http';

export type RequestHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  next?: (err?: any) => void
) => void;
