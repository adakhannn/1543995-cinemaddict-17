import {createElement} from '../../render.js';
import {filtersTemplate} from './filters-tpl';

export default class FiltersView {
  getTemplate() {
    return filtersTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
