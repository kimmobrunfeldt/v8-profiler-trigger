const v8ProfilerTrigger = require('../src/index');
v8ProfilerTrigger();

function slow(factor) {
  for (var i = 0; i < Math.pow(2, factor); ++i) {
    // no op
  }
}

function iteration(i) {
  console.log('Running slow(' + i + ')');
  slow(i);

  setTimeout(function() {
    iteration(i + 1);
  }, 500);
}

console.log('Using CPU in a very dumb way ..');
iteration(10);
