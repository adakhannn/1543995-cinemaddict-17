import {createElement} from '../../render';
import {cardTemplate} from './card-tpl';

export default class CardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return cardTemplate(this.film);
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
