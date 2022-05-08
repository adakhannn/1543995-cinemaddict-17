import {createElement} from '../../render';
import {popupTemplate} from './popup-tpl';

export default class PopupView {
  #element = null;
  #film = null;
  constructor(film) {
    this.#film = film;
  }

  get template() {
    return popupTemplate(this.#film);
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
