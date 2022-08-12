import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesDef = loadFilesSync(__dirname, {
  extensions: ['graphql', 'gql'],
  recursive: true,
  ignoreIndex: true,
});

export const typeDefs = mergeTypeDefs(typesDef);
