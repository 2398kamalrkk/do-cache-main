# free-cache

Simple cache tool with required functions | easy to use.

## Installation

```bash
npm install free-cache --save
```

## Usage

```python
var freeCache = require('free-cache');

// now ready to to use the cache

freeCache.put('email', 'my-email-id', true);
console.log(freeCache.get('email'));

// set timeout for specific key-value

freeCache.put('token', 'token-to-expire', true, 1000); // Time in ms

// set overwrite to false for a key for data integrity

freeCache.put('id', 'dont-overwrite-me', false);

//other functions
freeCache.delete('id');

console.log(freeCache.memsize('id'));

console.log(freeCache.getAllKeys('id'));
```