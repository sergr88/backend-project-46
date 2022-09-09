install:
	npm ci
exec:
	node bin/gendiff.js -h
lint:
	npx eslint .
test:
	npm test
test-watch:
	npm test --watchAll
test-coverage:
	npm test -- --coverage --coverageProvider=v8
