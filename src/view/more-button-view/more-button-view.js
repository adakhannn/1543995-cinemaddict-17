import {createElement} from '../../render.js';
import {moreButtonTemplate} from './more-button-tpl';

export default class MoreButtonView {
  getTemplate() {
    return moreButtonTemplate();
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
