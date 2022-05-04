import {createElement} from '../../render';
import {navigationTemplate} from './navigation-tpl';

export default class NavigationView {
  #element = null;
  get template() {
    return navigationTemplate();
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
