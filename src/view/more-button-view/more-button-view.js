import {createElement} from '../../render';
import {moreButtonTemplate} from './more-button-tpl';

export default class MoreButtonView {
  #element = null;
  get template() {
    return moreButtonTemplate();
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
