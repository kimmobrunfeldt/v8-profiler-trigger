const v8ProfilerTrigger = require('../src/index');
v8ProfilerTrigger();

console.log('Starting eternal interval of no ops ..')
setInterval(function() {
  console.log('no op.');
}, 1000);
