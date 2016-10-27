const v8ProfilerTrigger = require('../src/index');
v8ProfilerTrigger();

console.log('Filling array with useless objects ..');

let array = [];
setInterval(function() {
  array.push(new MyObject());
  if (array.length % 100 === 0) {
    console.log(array.length + ' items added');
  }
}, 10);

function MyObject() {
  this.a = 1;
}

MyObject.prototype.getA = function getA() {
  return this.a;
};
