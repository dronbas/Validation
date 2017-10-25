# Scond
=========


[![CircleCI](https://circleci.com/gh/dronbas/scond.svg?style=svg)](https://circleci.com/gh/dronbas/scond)


A small library that performs multi validation execution

## Installation

## Usage
#### Simple case
```javascript
const Validator = require('./src');

const validator = new Validator();

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

validator.addMulti([check1, check2]);

const values = {user: {
  access_level: 42
}};

validator.exec([{id: 'test_cond_2'}, {id: 'test_cond_1'}], values); //true

validator.add(check3);

validator.exec([{id: 'test_cond_2'}, {id: 'test_cond_1'}, {id: 'test_cond_3'}], values); //false

```


## Tests

  `npm test`
  or
  `yarn test`

## Contributing

If you want to join this case by help maintaining something, please don't hesitate to contact.

I'm happy to receive bug reports, fixes, documentation enhancements, and any other improvements.

And since I'm not a native English speaker, if you find any grammar mistakes in the documentation, please also let me know. :)