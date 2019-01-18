import * as stringify from 'json-stringify-safe';

const _stringify = (thing: any, native: boolean = false) => {
  try {
    if (native) return JSON.stringify(thing);
    return stringify(thing);
  } catch (err) {
    throw err;
  }
};

export default class Common {
  public stringify = _stringify;
}
