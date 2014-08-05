# http-query-parse

Parse and cache the query of an http request (supports nested clauses
using [qs](https://github.com/visionmedia/node-querystring))

A dead-simple function you can call on an incoming request in
multiple places without worrying about performance/caching and
without any prior parsing of the request/url.

If you like the style, check out
[http-body-parse](https://github.com/tjconcept/njs-http-body-parse)
and [http-get-pathname](https://github.com/tjconcept/njs-http-get-pathname)

## Installation

```shell
npm install http-query-parse
```

## Usage

The result is cached and subsequent calls are cheap

```js
var httpQueryParse = require('http-query-parse');

// http://localhost/path?name=brian&age[month]=5&age[year]=1991

httpQueryParse(request); // { name: 'brian', age: { month: '5', year: '1991' } }

// second call is cheap
httpQueryParse(request); // { name: 'brian', age: { month: '5', year: '1991' } }
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Thomas Jensen](http://tjconcept.dk)
