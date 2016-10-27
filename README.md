# v8-profiler-trigger

> Shortcuts to take CPU profiles or heap snapshots

[![NPM Badge](https://nodei.co/npm/v8-profiler-trigger.png?downloads=true)](https://www.npmjs.com/package/v8-profiler-trigger)

Trigger CPU profile recording or heap snapshots for node apps using keyboard
shortcuts.

**Taking a heap snapshot**

1. Start v8-profiler-trigger once in your app

  ```js
  const v8ProfilerTrigger = require('v8-profiler-trigger');
  v8ProfilerTrigger();
  ```

2. Press `h` followed by enter
3. Thats it, you can now load the saved *.heapsnapshot* to Chrome debugger

  In debugger, open `Profiles` tab. Click Load and
  open the <timestamp>.heapsnapshot.


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
  // Trigger snapshots or recording via stdin events.
  // The only method supported currently is 'stdin'.
  listenMethod: 'stdin',

  // Changes default CPU profiler sampling interval to the specified
  // number of microseconds. Default interval is 1000us.
  samplingInterval: 1000
}
```


## License

MIT
