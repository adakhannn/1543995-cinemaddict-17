import {createElement} from '../../render';
import {listTemplate} from './list-tpl';

export default class ListView {
  getTemplate() {
    return listTemplate();
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
