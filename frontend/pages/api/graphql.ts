import { apolloServer, cors } from '../../server';
import { RequestHandler } from '../../server/server-types';

const startServer = apolloServer.start();

const handler: RequestHandler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export default cors(handler);
