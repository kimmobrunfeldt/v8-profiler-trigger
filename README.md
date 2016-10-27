# v8-profiler-trigger

> Trigger a V8 profiler easily with keyboard shortcuts

[![Build Status](https://travis-ci.org/kimmobrunfeldt/v8-profiler-trigger.svg?branch=master)](https://travis-ci.org/kimmobrunfeldt/v8-profiler-trigger) *master branch status*

[![NPM Badge](https://nodei.co/npm/v8-profiler-trigger.png?downloads=true)](https://www.npmjs.com/package/v8-profiler-trigger)


1. npm install v8-profiler
2. require('./cpu-profile-trigger') once in your app code
3. Start CPU profiling with kill -PIPE <pid>. Instructions will be logged to stdout.
4. Stop CPU profiling with running again kill -PIPE <pid>
5. Go to Chrome debugger, open Profiles tab. Click Load and
   open the <timestamp>.cpuprofile. It was saved to the same dir
   where you started your app.
6. Open the CPU profile. You might want to change the view to "Chart".
   Default view is usually "Heavy (Bottom Up)" or "Tree (Top Down)".

## Install

```bash
npm install v8-profiler-trigger --save-dev
```

## API

### profilerTrigger([opts])

Starts the V8 profiler keyboard listeners.


#### `opts`

Most options are functions to allow maximal customization. The values
listed below are the defaults.

```js
{
  // Retry count overrides even though shouldRetry returns true
  // For unlimited retries, use Infinity.
  // To disable retrying, use 0.
  //
  // The first try is not counted as a "retry". If e.g. opts.maxRetries = 1,
  // The original API is called twice in the worst scenario:
  //   1. The real try
  //   2. The first retry
  maxRetries: 5,

  // Function which should return Number. Number is the timeout before retrying
  // in milliseconds. `retryCount` is the amount of retries already executed.
  // For the first retry event, the value of `retryCount` equals 0.
  retryTimeout: retryCount => 500,

  // Function which should return a Boolean.
  //  true:  retry will be executed if maxRetries hasn't been reached yet
  //  false: retrying will be skipped
  // Function gets the Promise rejection error value as the first parameter.
  shouldRetry: err => true,

  // Function which should return a Promise or undefined.
  // Executed before each retry. Can return a Promise for async operations.
  // For example this could be used to refresh oauth2 access_token before
  // retrying a request.
  beforeRetry: retryCount => Promise.resolve(),

  // Function which should return a Boolean.
  // When looping each attribute of the given `object`, this method will be
  // called to decide if the attribute should be wrapped or not.
  //
  //  true:  attribute should be wrapped with retry
  //  false: attribute should be left as is
  // Function gets the object attribute name as the first parameter.
  attributePicker: attrKey => true
}
```



## License

MIT
