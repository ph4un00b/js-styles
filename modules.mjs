'use strict';
import * as moduleFile from './module.mjs';

var module = (function () {
  var state = 10;

  return {
    method,
    state,
    get myState() {
      return state;
    },
  };

  function method() {
    state += 10;
    // console.log({ state });
    return 'hi!';
  }
})();

module.method();
module.method();
module.method();
moduleFile.method();
moduleFile.method();
moduleFile.method();
// false
console.log(module.state, moduleFile.state);
console.log(module.state == moduleFile.state);

// false
console.log(module.myState, moduleFile.myState);
console.log(module.myState == moduleFile.myState);
