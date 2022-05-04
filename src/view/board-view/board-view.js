import {createElement} from '../../render';
import {boardTemplate} from './board.tpl';

export default class BoardView {
  #element = null;
  get template() {
    return boardTemplate();
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
