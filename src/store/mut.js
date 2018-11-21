export default function(state, keyValues) {
  for (let key in keyValues) {
    state[key] = keyValues[key];
  }
};
