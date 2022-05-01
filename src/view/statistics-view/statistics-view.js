import {createElement} from '../../render.js';
import {statisticsTemplate} from './statistics-tpl';

export default class StatisticsView {
  getTemplate() {
    return statisticsTemplate();
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
