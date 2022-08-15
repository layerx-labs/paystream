import { mergeTypeDefs } from '@graphql-tools/merge';
import { print } from 'graphql';
import { writeFileSync } from 'fs';
import * as path from 'path';
import { sdlInputs } from './sdl-inputs';
import { getDMMF } from '@prisma/internals';

async function start() {
  const outputPath = path.resolve('server/graphql/generated/inputs.graphql');

  const dmmf = await getDMMF({
    datamodelPath: path.resolve('server/prisma/schema.prisma'),
  });
  const unwantedInputSuffixes = [
    'UncheckedUpdateInput',
    'WithAggregationInput',
    'WithAggregatesInput',
    'UncheckedCreateInput',
    'UncheckedUpdateInput',
    'CreateMany',
    'UpdateMany',
    'OrderByAggregateInput',
    'WithAggregatesFilter',
    'Without',
  ];

  const typeDefs = mergeTypeDefs([
    sdlInputs({
      dmmf,
      filterInputs(input) {
        const regex = new RegExp(
          `^\\w+\(${unwantedInputSuffixes.join('|')}\)\\w*`,
          'g'
        );
        return regex.test(input.name) ? [] : input.fields;
      },
    }),
  ]);

  const printedTypeDefs = print(typeDefs);
  writeFileSync(outputPath, printedTypeDefs, { encoding: 'utf8' });
  console.info('Generated GQL Inputs successfully', `see: ${outputPath}`);
}

start().then().catch(console.error);
