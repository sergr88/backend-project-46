#!/usr/bin/env node

import process from 'process';

import { program } from 'commander';

import genDiff from '../src/genDiff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
    process.stdout.write(result);
  });

program.parse();
