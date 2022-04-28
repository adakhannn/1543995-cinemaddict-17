import {createElement} from '../render.js';

const moreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class MoreButtonView {
  getTemplate() {
    return moreButtonTemplate();
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
