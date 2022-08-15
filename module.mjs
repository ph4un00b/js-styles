var state = 10;

function method() {
  state += 10;
  // console.log({ state });
  return 'hi!';
}

var myState = state;
export { method, state, myState };
