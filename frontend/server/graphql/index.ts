import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import * as path from 'path';

const typesDef = loadFilesSync(path.resolve('server/graphql'), {
  extensions: ['graphql', 'gql'],
  recursive: true,
  ignoreIndex: true,
});

export const typeDefs = mergeTypeDefs(typesDef);
