import {createElement} from '../render.js';

const listTemplate = () => (
  `<section class="films-list">
      <div class="films-list__container"></div
   </section>`
);

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
