const app = require('express')();
const request = require('request');
const v8ProfilerTrigger = require('../src/index');
v8ProfilerTrigger();

function slow(factor) {
  for (let i = 0; i < Math.pow(10, factor); ++i) {
    // blocking the event loop
  }
}

app.get(['/slow', `/${encodeURIComponent('🐢')}`], (req, res, next) => {
  slow(8);
  slow(8);
  res.json({ success: true });
});

app.get(['/fast', `/${encodeURIComponent('🚀')}`], (req, res, next) => {
  res.json({ success: true });
});

app.get(['/github-search', `/${encodeURIComponent('🔍')}`], (req, res, next) => {
  request('https://api.github.com/search/repositories', {
    qs: req.query,
    headers: {
      // Github API requires user agent
      'user-agent': 'test'
    }
  })
  .pipe(res);
});

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000 ..\n');
  console.log('Slow no-op');
  console.log('  http get localhost:3000/🐢\n');
  console.log('Fast no-op');
  console.log('  http get localhost:3000/🚀\n');
  console.log('Github search');
  console.log('  http get localhost:3000/🔍');
});
