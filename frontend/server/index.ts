import { ApolloServer } from 'apollo-server-micro';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { makeContext } from './graphql/context';
import { isProduction, getEnvironment } from '../utils/environment';
import { environment } from '../config/environment';
import depthLimit from 'graphql-depth-limit';
import { scribal } from './services/logger';
import { errorHandlingFunction } from './errors/error-handlers';
import makeCors from 'micro-cors';
import { makeResolvers } from './resolvers';
import { typeDefs } from './graphql';

const parseGqlLogger = (logger: typeof scribal) => ({
  debug: logger.d,
  info: logger.i,
  warn: logger.w,
  error: logger.e,
});

export const cors = makeCors({
  allowCredentials: true,
  origin: environment.corsAllowedOrigin,
});

export const makeApolloServer = async () =>
  new ApolloServer({
    typeDefs,
    resolvers: await makeResolvers(),
    csrfPrevention: true,
    cache: 'bounded',
    context: makeContext,
    formatError: errorHandlingFunction,
    logger: parseGqlLogger(scribal),
    nodeEnv: getEnvironment(),
    validationRules: [depthLimit(environment.graphQLDeepLimit)],
    introspection: !isProduction,
    debug: false,
    plugins: [
      ...(isProduction
        ? [ApolloServerPluginLandingPageDisabled()]
        : [ApolloServerPluginLandingPageGraphQLPlayground()]),
    ],
  });
