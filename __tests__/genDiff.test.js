import fs from 'fs';
import path from 'path';
import url from 'url';

import genDiff from '../src/genDiff.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const getFixturesDiff = (fileName1, fileName2, formatName) => {
  const path1 = getFixturePath(fileName1);
  const path2 = getFixturePath(fileName2);
  return genDiff(path1, path2, formatName);
};

const getFixtureContent = (fileName) => {
  const filePath = getFixturePath(fileName);
  return fs.readFileSync(filePath, 'utf8');
};

test('Empty JSON to default (stylish)', () => {
  const actualDifference = getFixturesDiff('empty_input1.json', 'empty_input2.json');
  const expectedDifference = getFixtureContent('empty_stylish.txt');
  expect(actualDifference).toBe(expectedDifference);
});

test('Hierarchical JSON to default (stylish)', () => {
  const actualDifference = getFixturesDiff('hierarchical_input1.json', 'hierarchical_input2.json');
  const expectedDifference = getFixtureContent('hierarchical_stylish.txt');
  expect(actualDifference).toBe(expectedDifference);
});

test('Empty YAML to default (stylish)', () => {
  const actualDifference = getFixturesDiff('empty_input1.yaml', 'empty_input2.yaml');
  const expectedDifference = getFixtureContent('empty_stylish.txt');
  expect(actualDifference).toBe(expectedDifference);
});

test('Hierarchical YAML to default (stylish)', () => {
  const actualDifference = getFixturesDiff('hierarchical_input1.yaml', 'hierarchical_input2.yaml');
  const expectedDifference = getFixtureContent('hierarchical_stylish.txt');
  expect(actualDifference).toBe(expectedDifference);
});

test('Hierarchical YML to default (stylish)', () => {
  const actualDifference = getFixturesDiff('hierarchical_input1.yml', 'hierarchical_input2.yml');
  const expectedDifference = getFixtureContent('hierarchical_stylish.txt');
  expect(actualDifference).toBe(expectedDifference);
});

test('Hierarchical JSON to plain', () => {
  const actualDifference = getFixturesDiff('hierarchical_input1.json', 'hierarchical_input2.json', 'plain');
  const expectedDifference = getFixtureContent('hierarchical_plain.txt');
  expect(actualDifference).toBe(expectedDifference);
});

test('Hierarchical JSON to json', () => {
  const actualDifference = getFixturesDiff('hierarchical_input1.json', 'hierarchical_input2.json', 'json');
  const expectedDifference = getFixtureContent('hierarchical_json.txt');
  expect(actualDifference).toBe(expectedDifference);
});
