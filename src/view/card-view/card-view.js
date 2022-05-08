import {createElement} from '../../render';
import {cardTemplate} from './card-tpl';

export default class CardView {
  #element = null;
  #film = null;
  constructor(film) {
    this.#film = film;
  }

  get template() {
    return cardTemplate(this.#film);
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
