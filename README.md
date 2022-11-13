# GenDiff

Hexlet tests and linter status:
[![Actions Status](https://github.com/sergr88/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/sergr88/backend-project-lvl2/actions/workflows/hexlet-check.yml)

Custom tests and linter status:
[![Actions Status](https://github.com/sergr88/backend-project-lvl2/workflows/check/badge.svg)](https://github.com/sergr88/backend-project-lvl2/actions/workflows/check.yml)

Codeclimate:
[![Maintainability](https://api.codeclimate.com/v1/badges/a69502d6c78441be0bfd/maintainability)](https://codeclimate.com/github/sergr88/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a69502d6c78441be0bfd/test_coverage)](https://codeclimate.com/github/sergr88/backend-project-lvl2/test_coverage)

## Описание
Утилита сравнивает два файла в форматах JSON или YAML и выводит различия в текстовом виде. Примеры работы:
- Сравнение плоских JSON-файлов:
[![asciicast](https://asciinema.org/a/m9W1BCH78HCSafWw8iqKOYHYk.svg)](https://asciinema.org/a/m9W1BCH78HCSafWw8iqKOYHYk)
- Сравнение плоских YAML-файлов:
[![asciicast](https://asciinema.org/a/mq9opq4ozpJsUyU1wmK0SFwTl.svg)](https://asciinema.org/a/mq9opq4ozpJsUyU1wmK0SFwTl)
- Сравнение иерархических JSON-файлов:
[![asciicast](https://asciinema.org/a/TBEhD1NttWfXLIXwnRV3pQwB0.svg)](https://asciinema.org/a/TBEhD1NttWfXLIXwnRV3pQwB0)
- Сравнение иерархических YAML-файлов:
[![asciicast](https://asciinema.org/a/I3iy46RhKSJWGSW3NYhFDD6h2.svg)](https://asciinema.org/a/I3iy46RhKSJWGSW3NYhFDD6h2)
- Сравнение иерархических JSON-файлов с форматированием в plain:
[![asciicast](https://asciinema.org/a/hNJVYG283FDBPxf5dxnMSHafh.svg)](https://asciinema.org/a/hNJVYG283FDBPxf5dxnMSHafh)
- Сравнение иерархических JSON-файлов с форматированием в json:
[![asciicast](https://asciinema.org/a/n60H8Mvjbv0KFvqQUN2QSGww0.svg)](https://asciinema.org/a/n60H8Mvjbv0KFvqQUN2QSGww0)

## Требования
- Node.js 16 LTS

## Команды

#### Развертывание
```shell
make install
```
#### Запуск с отображеним справки по интерфейсу утилиты
```shell
make exec
```
#### Проверка линтером
```shell
make lint
```
#### Выполнение тестов
```shell
make test
```
#### Выполнение тестов в режиме watch
```shell
make test-watch
```
#### Выполнение тестов с определением покрытия
```shell
make test-coverage
```
