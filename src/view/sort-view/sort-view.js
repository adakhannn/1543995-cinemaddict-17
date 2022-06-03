import {filtersTemplate} from './sort-tpl';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';

export default class SortView extends AbstractStatefulView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return filtersTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.element.querySelectorAll('.sort__button').forEach((item) => {
      item.classList.remove('sort__button--active');
    });
    evt.target.classList.add('sort__button--active');
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

  _restoreHandlers = () => {
    this.setSortTypeChangeHandler(this._callback.sortTypeChange);
  };
}
