const _ = require('lodash');
const BPromise = require('bluebird');
const chalk = require('chalk');
const fs = BPromise.promisifyAll(require('fs'));
const profiler = BPromise.promisifyAll(require('v8-profiler'));

function listen(opts) {
  opts = _.merge({
    listenMethod: 'stdin',

    // Changes default CPU profiler sampling interval to the specified
    // number of microseconds. Default interval is 1000us.
    samplingInterval: 1000,
  }, opts);

  profiler.setSamplingInterval(opts.samplingInterval);

  if (opts.listenMethod === 'stdin') {
    listenStdin(opts);
  }
}

function listenStdin(opts) {
  console.log('\n');
  console.log([
    chalk.gray('-----------------'),
    chalk.gray.bold('v8-profiler-trigger'),
    chalk.gray('-----------------------')
  ].join(''));
  console.log(chalk.italic.gray('\n Press any of the characters below followed by enter\n'));
  console.log(chalk.red.bold(' (c) '), 'Toggle CPU profiling');
  console.log(chalk.blue.bold(' (h) '), 'Save heap snapshot\n');
  console.log(chalk.gray('-----------------------------------------------------------\n\n'));

  process.stdin.resume();
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', function(key) {
    switch (key.trim()) {
      case 'c':
        return toggleCpuProfiler();
      case 'h':
        return saveHeapSnapshot();
    }
  });
}

let cpuProfilerRunning = false;
let cpuProfilerStartTimestamp;
function toggleCpuProfiler() {
  if (!cpuProfilerRunning) {
    logGray('Start CPU profiling ..');

    cpuProfilerStartTimestamp = timestamp();
    profiler.startProfiling(cpuProfilerStartTimestamp, true);
    cpuProfilerRunning = true;
  } else {
    logGray('Saving CPU profile ..');
    const profile = BPromise.promisifyAll(profiler.stopProfiling());
    profile.exportAsync()
      .then(function(result) {
        const fileName = cpuProfilerStartTimestamp + '.cpuprofile';

        return BPromise.props({
          write: fs.writeFileAsync(fileName, result),
          fileName: fileName
        });
      })
      .then(function(res) {
        logGray('Saved CPU profile as ' + res.fileName);
        profile.delete();
      });

    cpuProfilerRunning = false;
  }
}

function saveHeapSnapshot() {
  logGray('Saving heap snapshot ..');

  const snapshot = BPromise.promisifyAll(profiler.takeSnapshot());
  snapshot.exportAsync()
    .then(function(result) {
      const fileName = timestamp() + '.heapsnapshot';

      return BPromise.props({
        write: fs.writeFileAsync(fileName, result),
        fileName: fileName
      });
    })
    .then(function(res) {
      logGray('Saved heap snapshot as ' + res.fileName);
      snapshot.delete();
    });
}

function logGray(/* arguments */) {
  const args = Array.prototype.slice.call(arguments);
  console.log.apply(this, args.map(function(i) {
    return chalk.gray(i);
  }));
}

function timestamp() {
  return (new Date()).toISOString().split('.')[0].replace(/:/g, '-');
}

module.exports = listen;
