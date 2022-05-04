import {createElement} from '../../render';
import {popupTemplate} from './popup-tpl';

export default class PopupView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return popupTemplate(this.film);
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
