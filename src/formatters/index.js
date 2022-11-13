import stylish from './stylish.js';
import plain from './plain.js';

const formatDifference = (difference, formatName) => {
  if (formatName === 'stylish') {
    return stylish(difference);
  }

  if (formatName === 'plain') {
    return plain(difference);
  }

  return `Format '${formatName}' has not yet been implemented\n`;
};

export default formatDifference;
