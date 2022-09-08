import { readFileSync } from 'fs';
import _ from 'lodash';

const getDifferencePresentation = (elements) => {
  const body = elements.map((el) => `  ${el.prefix} ${el.key}: ${el.value}`);
  return ['{', ...body, '}'].join('\n');
};

const genDiff = (filepath1, filepath2) => {
  const fileContent1 = readFileSync(filepath1, 'utf8');
  const fileContent2 = readFileSync(filepath2, 'utf8');

  const properties1 = JSON.parse(fileContent1);
  const properties2 = JSON.parse(fileContent2);

  const differenceFromFile1 = Object.entries(properties1)
    .map(([key, value]) => ({
      prefix: (value === properties2[key]) ? ' ' : '-',
      key,
      value,
    }));

  const differenceFromFile2 = Object.entries(properties2)
    .map(([key, value]) => ({
      prefix: (value !== properties1[key]) ? '+' : '',
      key,
      value,
    }))
    .filter((property) => property.prefix !== '');

  const difference = _.sortBy([...differenceFromFile1, ...differenceFromFile2], 'key');

  return getDifferencePresentation(difference);
};

export default genDiff;
