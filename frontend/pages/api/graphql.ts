import { makeApolloServer, cors } from '../../server';
import { RequestHandler } from '../../server/server-types';
import { ApolloServer } from 'apollo-server-micro';
import { listenersInit } from '../../server/listeners';

let apolloServer: ApolloServer;

listenersInit().then().catch(console.error);

const handler: RequestHandler = async (req, res) => {
  if (!apolloServer) {
    apolloServer = await makeApolloServer();
    await apolloServer.start();
  }

  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export default cors(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
