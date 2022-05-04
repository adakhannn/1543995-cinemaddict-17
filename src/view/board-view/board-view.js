import {createElement} from '../../render';
import {boardTemplate} from './board.tpl';

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
