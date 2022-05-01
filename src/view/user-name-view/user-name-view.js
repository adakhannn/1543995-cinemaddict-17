import {createElement} from '../../render.js';
import {userNameTemplate} from './user-name-tpl';

export default class UserNameView {
  getTemplate() {
    return userNameTemplate();
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
