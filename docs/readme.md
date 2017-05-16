# CPU Profiling

Practical introduction to CPU profiling Node apps.

**Remember**, Node uses a single thread. CPU processing blocks all other tasks.
In HTTP context, doing CPU work blocks all other requests.

## Tools

* Native ways in Node 6+

  * `--inspect` *My recommendation for start*
  * `--prof`, `--prof-process` *For deeper investigation*

    https://nodejs.org/en/docs/guides/simple-profiling/

    > There are many third party tools available for profiling Node.js applications but, in many cases, the easiest option is to use the Node.js built in profiler.

    To me, importing the .cpuprofile to a graphical debugger feels much easier.

* [v8-profiler](https://github.com/node-inspector/v8-profiler)

  Profiling can be triggered from code.

  [v8-profiler-trigger](https://github.com/kimmobrunfeldt/v8-profiler-trigger)
  for those times when `--inspect` just doesn't work or is slow as hell.



## Resources

**V8 optimization**

* https://github.com/thlorenz/v8-perf/blob/master/performance-profiling.md
* https://github.com/petkaantonov/bluebird/wiki/Optimization-killers
* https://github.com/vhf/v8-bailout-reasons
* More detailed V8 profiling: https://gist.github.com/kevincennis/0cd2138c78a07412ef21
