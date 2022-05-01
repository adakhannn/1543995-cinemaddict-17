import {createElement} from '../../render.js';
import {popupTemplate} from './popup-tpl';

export default class PopupView {
  getTemplate() {
    return popupTemplate();
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
