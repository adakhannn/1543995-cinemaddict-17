import {FILTER_TYPE} from '../consts.js';
import Observable from '../framework/observable.js';

export default class FiltersModel extends Observable {
  #filterType = FILTER_TYPE.ALL;

  get filterType() {
    return this.#filterType;
  }

  setFilter = (updateType, filterType) => {
    this.#filterType = filterType;
    this._notify(updateType, filterType);
  };
}
