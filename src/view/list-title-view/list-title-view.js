import {createElement} from '../../render';
import {listTitleTemplate} from './list-title-tpl';

export default class ListTitleView {
  #element = null;
  get template() {
    return listTitleTemplate();
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
