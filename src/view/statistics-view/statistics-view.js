import {createElement} from '../../render';
import {statisticsTemplate} from './statistics-tpl';

export default class StatisticsView {
  #element = null;
  get template() {
    return statisticsTemplate();
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
