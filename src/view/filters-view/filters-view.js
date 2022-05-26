import AbstractView from '../../framework/view/abstract-view';
import {filtersTemplate} from './filters-tpl';

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return filtersTemplate(this.#filters);
  }
}
