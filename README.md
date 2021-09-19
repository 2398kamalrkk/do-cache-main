# do-cache

Simple runtime cache with required functions | easy to use.

## Installation

```bash
npm install do-cache --save
```

## Usage

```python
var doCache = require('do-cache');

// now ready to to use the cache

doCache.put('email', 'my-email-id', true);
console.log(doCache.get('email'));

// set timeout for specific key-value

doCache.put('token', 'token-to-expire', true, 1000); // Time in ms

// set overwrite to false for a key for data integrity

doCache.put('id', 'dont-overwrite-me', false);

```