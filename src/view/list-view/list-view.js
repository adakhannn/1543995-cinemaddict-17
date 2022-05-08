import {createElement} from '../../render';
import {listTemplate} from './list-tpl';

export default class ListView {
  #element = null;
  get template() {
    return listTemplate();
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
