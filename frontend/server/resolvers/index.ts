import * as path from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const resolverFiles = loadFilesSync(path.join(__dirname, './**/*.resolver.*'));

export const resolvers = mergeResolvers(resolverFiles);
