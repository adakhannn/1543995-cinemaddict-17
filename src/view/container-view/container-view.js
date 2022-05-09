import {createElement} from '../../render';
import {containerTemplate} from './container-tpl';

export default class ContainerView {
  #element = null;
  get template() {
    return containerTemplate();
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
