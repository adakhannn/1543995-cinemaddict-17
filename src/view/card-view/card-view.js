import {createElement} from '../../render.js';
import {cardTemplate} from './card-tpl';

export default class CardView {
  getTemplate() {
    return cardTemplate();
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
