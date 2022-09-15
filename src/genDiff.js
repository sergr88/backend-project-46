import fs from 'fs';
import path from 'path';

import _ from 'lodash';

import parseText from './parsers.js';

const getDifferencePresentation = (elements) => {
  const body = elements.map(({ prefix, key, value }) => `  ${prefix} ${key}: ${value}`);
  return ['{', ...body, '}', ''].join('\n');
};

const compare = (baseProperties, operation, comparableProperties, { prefix }) => {
  const difference = operation(baseProperties, comparableProperties, _.isEqual);
  return difference.map((property) => ({ prefix, ...property }));
};

const genDiff = (filepath1, filepath2) => {
  const fileContent1 = fs.readFileSync(filepath1, 'utf8');
  const fileContent2 = fs.readFileSync(filepath2, 'utf8');

  const properties1 = parseText(fileContent1, path.extname(filepath1));
  const properties2 = parseText(fileContent2, path.extname(filepath2));

  const inBothFiles = compare(properties1, _.intersectionWith, properties2, { prefix: ' ' });
  const onlyInFile1 = compare(properties1, _.differenceWith, properties2, { prefix: '-' });
  const onlyInFile2 = compare(properties2, _.differenceWith, properties1, { prefix: '+' });

  const difference = _.sortBy([...inBothFiles, ...onlyInFile1, ...onlyInFile2], 'key');

  return getDifferencePresentation(difference);
};

export default genDiff;
