import {createElement} from '../render.js';

const boardTemplate = () => '<section class="films"></section>';

export default class BoardView {
  getTemplate() {
    return boardTemplate();
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
