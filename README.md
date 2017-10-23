# axios-cache-adapter

> Caching adapter for axios

Adapted from [superapi-cache](https://github.com/stephanebachelier/superapi-cache) by @stephanebachelier

## Install

Using npm

```sh
npm install --save axios-cache-adapter
```

Or bower

```sh
bower install --save axios-cache-adapter
```

Or from a CDN like unpkg.com

```html
<script type="text/javascript" src="https://unpkg.com/axios-cache-adapter"></script>
```

*PS: For bower users there is a limitation, this library uses `lodash-es` as a dependency which is not published on bower.*
*If you use bower, use the bundled version of the lib `dist/cache.bundled.js`*

## Usage

You can use the adapter directly

```js
import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  maxAge: 15 * 60 * 1000
})

const api = axios.create({
  adapter: cache.adapter
})

api({
  url: 'http://some-rest.api/url',
  method: 'get'
}).then(response => {
  // Do something fantastic with response.data \o/
})
```

Or you can get an instance of axios pre-configured with the cache adapter

```js
import { setup } from 'axios-cache-adapter'

const api = setup({
  cache: {
    maxAge: 15 * 60 * 1000
  }
})

api({
  url: 'http://some-reset.api/url',
  method: 'get'
}).then(response => {
  // Do something awesome with response.data \o/
})
```

## API

### setupCache(options)

Create a cache adapter instance. Takes an `options` object to configure how the cached requests will be handled,
where they will be stored, etc.

#### Options

* `maxAge {Number}`: Maximum time for storing each request in milliseconds, defaults to 15 minutes (`15 * 60 * 1000`)
* `store {Object}`: An instance of `localStorage`, defaults to a custom in memory store
* `clearOnStale {Boolean}`: Clear cache when it is stale, defaults to `true`
* `limit {Number}`: Maximum number of cached request (last in, first out queue system), no limit by default
* `key {Mixed}`: Can either be a `String` or a `Function` which receives the `request` object as first parameter to return a unique cache key for each request. Defaults to `req => req.url`
* `exclude {Object}`: Object defining which kind of requests should be excluded from cache
  * `filter {Function}`: A method which receives the request and returns `true` to exclude request from cache, defaults to `null`
  * `query {Boolean}`: If `true` all requests containing a query will be excluded, defaults to `true`
  * `paths {Array}`: An `Array` of regular expressions to match against request URLs, if a match is found it will be excluded, defaults to `[]`
* `debug {Boolean}`: Print some logs to console, defaults to `false`

#### Returns

`setupCache()` returns an object containing the configured `adapter` and the cache `store`.

### setup(options)

Create an `axios` instance pre-configured with the cache adapter. Takes an `options` object to configure the cache and
axios at the same time.

#### Options

* `cache {Object}`: Same options as the `setupCache` method

All the other parameters passed in the `options` will be passed directly to the [`axios.create`](https://github.com/mzabriskie/axios#creating-an-instance) method.

#### Returns

`setup()` returns an instance of `axios` pre-configured with the cache adapter.

## License

MIT © [Carl Ogren](https://github.com/RasCarlito)
