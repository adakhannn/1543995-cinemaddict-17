import {createElement} from '../../render';
import {userNameTemplate} from './user-name-tpl';

export default class UserNameView {
  #element = null;

  get template() {
    return userNameTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
