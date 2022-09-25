import fs from 'fs';
import path from 'path';
import url from 'url';

import genDiff from '../src/genDiff.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getFixturesDiff = (fileName1, fileName2) => {
  const path1 = getFixturePath(fileName1);
  const path2 = getFixturePath(fileName2);
  return genDiff(path1, path2);
};

const getFixtureContent = (fileName) => {
  const filePath = getFixturePath(fileName);
  return fs.readFileSync(filePath, 'utf8');
};

test('Empty JSON', () => {
  const actualDifference = getFixturesDiff('empty_input1.json', 'empty_input2.json');
  const expectedDifference = getFixtureContent('empty_result.txt');
  expect(actualDifference).toBe(expectedDifference);
});

test('Hierarchical JSON', () => {
  const actualDifference = getFixturesDiff('hierarchical_input1.json', 'hierarchical_input2.json');
  const expectedDifference = getFixtureContent('hierarchical_result.txt');
  expect(actualDifference).toBe(expectedDifference);
});

test('Empty YAML', () => {
  const actualDifference = getFixturesDiff('empty_input1.yaml', 'empty_input2.yaml');
  const expectedDifference = getFixtureContent('empty_result.txt');
  expect(actualDifference).toBe(expectedDifference);
});

test('Hierarchical YAML', () => {
  const actualDifference = getFixturesDiff('hierarchical_input1.yaml', 'hierarchical_input2.yaml');
  const expectedDifference = getFixtureContent('hierarchical_result.txt');
  expect(actualDifference).toBe(expectedDifference);
});

test('Hierarchical YML', () => {
  const actualDifference = getFixturesDiff('hierarchical_input1.yml', 'hierarchical_input2.yml');
  const expectedDifference = getFixtureContent('hierarchical_result.txt');
  expect(actualDifference).toBe(expectedDifference);
});
