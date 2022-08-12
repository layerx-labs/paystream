import { mergeTypeDefs } from '@graphql-tools/merge';
import { sdlInputs } from '@paljs/plugins';
import { print } from 'graphql';
import { writeFileSync } from 'fs';
import * as path from 'path';

const outputPath = path.resolve('server/graphql/generated/inputs.graphql');
const typeDefs = mergeTypeDefs([sdlInputs()]);

const printedTypeDefs = print(typeDefs);

function start() {
  writeFileSync(outputPath, printedTypeDefs, { encoding: 'utf8' });
  console.info('Generated GQL Inputs successfully', `see: ${outputPath}`);
}

start();
