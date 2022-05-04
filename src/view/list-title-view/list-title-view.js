import {createElement} from '../../render';
import {listTitleTemplate} from './list-title-tpl';

export default class ListTitleView {
  getTemplate() {
    return listTitleTemplate();
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
