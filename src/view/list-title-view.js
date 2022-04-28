import {createElement} from '../render.js';

const listTitleTemplate = () => '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';

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
