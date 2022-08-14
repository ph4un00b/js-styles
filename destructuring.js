// in order to prevent type errors
var {
  prop_a,
  prop_b,
  // do not forget defaults in nested objects!
  complex_prop_c: { prop_d, prop_e } = {},
  // } = fetched_data();
} = fetched_data() ?? {};

console.log({ prop_a });

function fetched_data() {}
