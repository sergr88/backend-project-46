import fs from 'fs';
import path from 'path';

import _ from 'lodash';

import parseText from './parsers.js';
import formatDifference from './formatters/index.js';

function getValuePresence(key, value, comparableProperties, side) {
  const isPropertyConsideredSame = () => {
    if (!_.has(comparableProperties, key)) return false;

    const secondValue = _.get(comparableProperties, key);
    return value === secondValue || (_.isPlainObject(value) && _.isPlainObject(secondValue));
  };

  return isPropertyConsideredSame(key, value, comparableProperties) ? 'both' : side;
}

const getFullKey = (key, nestedKey) => {
  const ancestralPath = key ? `${key}.` : '';
  return `${ancestralPath}${nestedKey}`;
};

const getOneSideDifference = (rootKey, rootValue, comparableProperties, side) => {
  const iter = (key, value) => {
    const valueField = getValuePresence(key, value, comparableProperties, side);

    if (!_.isPlainObject(value)) return { [valueField]: value };

    const transformedValue = Object.keys(value).reduce((acc, nestedKey) => {
      const nestedValues = iter(getFullKey(key, nestedKey), value[nestedKey]);
      return { ...acc, [nestedKey]: nestedValues };
    }, {});
    return key ? { [valueField]: transformedValue } : transformedValue;
  };

  return iter(rootKey, rootValue);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileContent1 = fs.readFileSync(filepath1, 'utf8');
  const fileContent2 = fs.readFileSync(filepath2, 'utf8');

  const properties1 = parseText(fileContent1, path.extname(filepath1));
  const properties2 = parseText(fileContent2, path.extname(filepath2));

  const difference1 = getOneSideDifference(null, properties1, properties2, 'first');
  const difference2 = getOneSideDifference(null, properties2, properties1, 'second');
  const difference = _.merge(difference1, difference2);

  return formatDifference(difference, formatName);
};

export default genDiff;
