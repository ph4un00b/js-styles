'use strict';
import * as moduleFile from './module.mjs';

iife_module_aka_revealing_module: {
  // only one instance aka singleton
  var module = (function Module() {
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
}

factory_module: {
  function Module() {
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
  }

  // can get multiple instances
  var fmodule = Module();
}

fmodule.method();
fmodule.method();
fmodule.method();
moduleFile.method();
moduleFile.method();
moduleFile.method();
// false
console.log(fmodule.state, moduleFile.state);
console.log(fmodule.state == moduleFile.state);

// false
console.log(fmodule.myState, moduleFile.myState);
console.log(fmodule.myState == moduleFile.myState);
