import _ from 'lodash';

const getValuePresentation = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';

  return (typeof value === 'string') ? `'${value}'` : `${value}`;
};

const formatPropertyDifference = (propertyKey, propertyValue) => {
  const hasFirst = _.has(propertyValue, 'first');
  const hasSecond = _.has(propertyValue, 'second');

  if (hasFirst && !hasSecond) {
    return `Property '${propertyKey}' was removed`;
  }

  if (!hasFirst && hasSecond) {
    const secondValue = getValuePresentation(_.get(propertyValue, 'second'));
    return `Property '${propertyKey}' was added with value: ${secondValue}`;
  }

  const firstValue = getValuePresentation(_.get(propertyValue, 'first'));
  const secondValue = getValuePresentation(_.get(propertyValue, 'second'));
  return `Property '${propertyKey}' was updated. From ${firstValue} to ${secondValue}`;
};

const plain = (difference) => {
  const iter = (propertyKey, propertyValue) => {
    if (_.has(propertyValue, 'first') || _.has(propertyValue, 'second')) {
      return formatPropertyDifference(propertyKey, propertyValue);
    }

    const currentValue = propertyValue.both;

    if (!_.isPlainObject(currentValue)) return '';

    return Object.keys(currentValue)
      .sort()
      .flatMap((nestedKey) => {
        const ancestralPath = propertyKey ? `${propertyKey}.` : '';
        return iter(`${ancestralPath}${nestedKey}`, currentValue[nestedKey]);
      });
  };

  const lines = iter(null, { both: difference });
  return _.compact(lines).join('\n');
};

export default plain;
