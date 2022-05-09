import {createElement} from '../../render';
import {filtersTemplate} from './sort-tpl';

export default class SortView {
  #element = null;
  get template() {
    return filtersTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
