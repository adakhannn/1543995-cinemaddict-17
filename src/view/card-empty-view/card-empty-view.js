import {createElement} from '../../render';
import {cardEmptyTemplate} from './card-empty-tpl';

export default class CardEmptyView {
  #element = null;
  get template() {
    return cardEmptyTemplate();
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
