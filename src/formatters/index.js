import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatDifference = (difference, formatName) => {
  if (formatName === 'stylish') {
    return stylish(difference);
  }

  if (formatName === 'plain') {
    return plain(difference);
  }

  if (formatName === 'json') {
    return json(difference);
  }

  return `Format '${formatName}' has not yet been implemented\n`;
};

export default formatDifference;
