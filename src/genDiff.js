import fs from 'fs';

import _ from 'lodash';

const getDifferencePresentation = (elements) => {
  const body = elements.map(({ prefix, key, value }) => `  ${prefix} ${key}: ${value}`);
  return ['{', ...body, '}', ''].join('\n');
};

const compare = (baseProperties, operation, comparableProperties, { prefix }) => {
  const difference = operation(baseProperties, comparableProperties, _.isEqual);
  return difference.map(([key, value]) => ({ prefix, key, value }));
};

const genDiff = (filepath1, filepath2) => {
  const fileContent1 = fs.readFileSync(filepath1, 'utf8');
  const fileContent2 = fs.readFileSync(filepath2, 'utf8');

  const properties1 = Object.entries(JSON.parse(fileContent1));
  const properties2 = Object.entries(JSON.parse(fileContent2));

  const inBothFiles = compare(properties1, _.intersectionWith, properties2, { prefix: ' ' });
  const onlyInFile1 = compare(properties1, _.differenceWith, properties2, { prefix: '-' });
  const onlyInFile2 = compare(properties2, _.differenceWith, properties1, { prefix: '+' });

  const difference = _.sortBy([...inBothFiles, ...onlyInFile1, ...onlyInFile2], 'key');

  return getDifferencePresentation(difference);
};

export default genDiff;
