import * as path from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';

export async function makeResolvers() {
  const resolverFiles = await loadFiles(
    path.resolve('server/resolvers/**/*.resolver.*'),
    {
      useRequire: true,
      requireMethod: async (p: string) => {
        const pathParsed = p.slice(
          p.lastIndexOf('server/resolvers/') + 'server/resolvers/'.length
        );
        return await import(`./${pathParsed}`);
      },
    }
  );

  return mergeResolvers(resolverFiles);
}
