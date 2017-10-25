# Scond
=========


[![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg)](https://circleci.com/gh/dronbas/scond)
[![codecov](https://codecov.io/gh/dronbas/scond/branch/master/graph/badge.svg)](https://codecov.io/gh/dronbas/scond)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A small library that performs multi validation execution

## Installation
```javascript
npm i -S scond
```
or
```javascript
yarn add scond
```
## Usage
#### Simple case
```javascript
const Scond = require('scond');

const scond = new Scond();

const check1 = {
  id: 'test_cond_1',
  check: values => {
    return values.user.access_level > 10
  }
};

const check2 = {
  id: 'test_cond_2',
  check: values => {
    return typeof values.user === 'object'
  }
};

const check3 = {
  id: 'test_cond_3',
  check: values => {
    return values.user.access_level > 100
  }
};

scond.addMulti([check1, check2]);

const values = {user: {
  access_level: 42
}};

scond.exec([{id: 'test_cond_2'}, {id: 'test_cond_1'}], values); //true

scond.add(check3);

scond.exec([{id: 'test_cond_2'}, {id: 'test_cond_1'}, {id: 'test_cond_3'}], values); //false

```


## Tests

  `npm test`
  or
  `yarn test`

## Contributing

If you want to join this case by help maintaining something, please don't hesitate to contact.

I'm happy to receive bug reports, fixes, documentation enhancements, and any other improvements.

And since I'm not a native English speaker, if you find any grammar mistakes in the documentation, please also let me know. :)