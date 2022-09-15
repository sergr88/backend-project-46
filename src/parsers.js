import yaml from 'js-yaml';
import _ from 'lodash';

const parseText = (text, format) => {
  let properties;
  if (/json/i.test(format)) {
    properties = JSON.parse(text);
  } else if (/ya?ml/i.test(format)) {
    properties = yaml.load(text);
  }
  const propertiesObject = _.isObject(properties) ? properties : {};
  return _.map(propertiesObject, (value, key) => ({ key, value }));
};

export default parseText;
