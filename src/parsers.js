import yaml from 'js-yaml';

const parseText = (text, format) => {
  if (/json/i.test(format)) {
    return JSON.parse(text);
  }

  if (/ya?ml/i.test(format)) {
    return yaml.load(text);
  }

  return {};
};

export default parseText;
