import _ from 'lodash';

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

  return iter(null, { root: difference }, 0, false).join('\n');
};

export default stylish;
