import {createElement} from '../../render';
import {navigationTemplate} from './navigation-tpl';

export default class NavigationView {
  getTemplate() {
    return navigationTemplate();
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
