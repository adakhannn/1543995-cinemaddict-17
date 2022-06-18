import AbstractView from '../../framework/view/abstract-view';
import {statisticsTemplate} from './statistics-tpl';

export default class StatisticsView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return statisticsTemplate(this.#films);
  }
}
