import AbstractView from '../../framework/view/abstract-view';
import {filtersTemplate} from './sort-tpl';

export default class SortView extends AbstractView {
  get template() {
    return filtersTemplate();
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
}
