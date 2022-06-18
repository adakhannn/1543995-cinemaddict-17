import {FILTER_TYPE, FILM_UPDATE_TYPE} from '../consts.js';
import {render, replace, remove} from '../framework/render.js';
import FiltersView from '../view/filters-view/filters-view';
import {filter} from '../utils/filter.js';

export default class FiltersPresenter {
  #filterContainer = null;
  #filtersModel = null;
  #filmsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filtersModel, filmsModel) {
    this.#filterContainer = filterContainer;
    this.#filtersModel = filtersModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleFilmsModelEvent);
    this.#filtersModel.addObserver(this.#handleFilmsModelEvent);
  }

  get filters() {
    const films = this.#filmsModel.films;
    const filters = [];

    for (const item in FILTER_TYPE) {
      filters.push(
        {
          name: FILTER_TYPE[item],
          count: filter[FILTER_TYPE[item]](films).length,
        }
      );
    }

    return filters;
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView(filters, this.#filtersModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleFilmsModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(FILM_UPDATE_TYPE.MAJOR, filterType);
  };
}
