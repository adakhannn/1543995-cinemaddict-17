import {createElement} from '../../render';
import {filtersTemplate} from './filters-tpl';

export default class FiltersView {
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
