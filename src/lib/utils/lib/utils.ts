/* internals */
import Common from './common';

export default class Utils {
  private _common: Common = new Common();

  get common() {
    return this._common;
  }
}
