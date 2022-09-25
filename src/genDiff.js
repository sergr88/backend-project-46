import fs from 'fs';
import path from 'path';

import _ from 'lodash';

import parseText from './parsers.js';

const baseIndent = '    ';

const optionMapping = [
  { field: 'root', prefix: '' },
  { field: 'first', prefix: '- ' },
  { field: 'second', prefix: '+ ' },
  { field: 'both', prefix: '  ' },
];

const stylish = (difference) => {
  const iter = (propertyKey, propertyValue, level, isNoPrefix) => {
    const fullIndent = baseIndent.repeat(level);
    return optionMapping
      .filter(({ field }) => _.has(propertyValue, field))
      .flatMap(({ field, prefix }) => {
        const currentValue = propertyValue[field];
        const fullPrefix = [
          fullIndent.slice(0, -2),
          isNoPrefix ? '  ' : prefix,
          propertyKey ? `${propertyKey}: ` : '',
        ].join('');

        if (!_.isPlainObject(currentValue)) {
          return [`${fullPrefix}${currentValue}`];
        }

        const isNoNestedPrefix = isNoPrefix || prefix.trim() !== '';
        const lines = Object.keys(currentValue).sort().flatMap(
          (nestedKey) => iter(nestedKey, currentValue[nestedKey], level + 1, isNoNestedPrefix),
        );
        return [`${fullPrefix}{`, ...lines, `${fullIndent}}`];
      });
  };

  return [...iter(null, { root: difference }, 0, false), ''].join('\n');
};

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

    const transformedValue = _.transform(value, (acc, nestedValue, nestedKey) => {
      const nestedValues = iter(getFullKey(key, nestedKey), nestedValue);
      _.set(acc, nestedKey, nestedValues);
    }, {});
    return key ? { [valueField]: transformedValue } : transformedValue;
  };

  return iter(rootKey, rootValue);
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const fileContent1 = fs.readFileSync(filepath1, 'utf8');
  const fileContent2 = fs.readFileSync(filepath2, 'utf8');

  const properties1 = parseText(fileContent1, path.extname(filepath1));
  const properties2 = parseText(fileContent2, path.extname(filepath2));

  const difference1 = getOneSideDifference(null, properties1, properties2, 'first');
  const difference2 = getOneSideDifference(null, properties2, properties1, 'second');
  const difference = _.merge(difference1, difference2);

  if (outputFormat === 'stylish') {
    return stylish(difference);
  }
  return `Output format "${outputFormat}" has not yet been implemented\n`;
};

export default genDiff;
