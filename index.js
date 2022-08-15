'use strict';
// run `node index.js` in the terminalO
var hola = 'jamon';
console.log(globalThis.hola, hola);
// console.log(__dirname, '.example');
let racer1 = function () {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
  process.nextTick(() => console.log('nextTick'));
};

let racer2 = function () {
  process.nextTick(() => console.log('nextTick2'));
  setTimeout(() => console.log('timeout2'), 0);
  setImmediate(() => console.log('immediate2'));
};

let racer3 = function () {
  setImmediate(() => console.log('immediate3'));
  process.nextTick(() => console.log('nextTick3'));
  setTimeout(() => console.log('timeout3'), 0);
};

racer1();
// next
// timeout
// imediate
