import {FILM_COUNT_PER_STEP, SORT_TYPE, UPDATE_TYPE, FILTER_TYPE} from '../consts';
import {remove, render, RenderPosition} from '../framework/render';
import {sortFilmDate, sortFilmRating} from '../utils/sort.js';
import {filter} from '../utils/filter.js';
import BoardView from '../view/board-view/board-view';
import ListView from '../view/list-view/list-view';
import MoreButtonView from '../view/more-button-view/more-button-view';
import SortView from '../view/sort-view/sort-view';
import CardEmptyView from '../view/card-empty-view/card-empty-view';
import ContainerView from '../view/container-view/container-view';
import LoadingView from '../view/loading-view/loading-view';
import FilmPresenter from './film-presenter';

export default class BoardPresenter {
  #boardContainer = null;
  #filmsModel = null;
  #sortComponent = null;
  #moreButtonComponent = null;
  #filtersModel = null;
  #cardEmptyComponent = null;

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #boardComponent = new BoardView();
  #listComponent = new ListView();
  #containerComponent = new ContainerView();
  #loadingComponent = new LoadingView();
  #filmPresenter = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;
  #filterType = FILTER_TYPE.ALL;
  #isLoading = true;

  constructor(boardContainer, filmsModel, filtersModel) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
    this.#filtersModel = filtersModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filtersModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SORT_TYPE.DATE:
        return filteredFilms.sort(sortFilmDate);
      case SORT_TYPE.RATING:
        return filteredFilms.sort(sortFilmRating);
    }
    return filteredFilms;
  }

  init () {
    this.#renderBoard();
  }

  #handleMoreButtonClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderFilms(films);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (this.#renderedFilmCount >= filmCount) {
      remove(this.#moreButtonComponent);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedFilmCount: true});
    this.#renderBoard();
  };

  #handleFilmsViewAction = (updateType, update) => {
    this.#filmsModel.updateFilm(updateType, update);
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UPDATE_TYPE.MAJOR:
        this.#clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this.#renderBoard();
        break;
      case UPDATE_TYPE.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #renderSort() {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter(this.#boardContainer, this.#containerComponent.element, this.#handleFilmsViewAction);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderFilms(films) {
    films.forEach((film) => this.#renderFilm(film));
  }

  #renderCardEmptyInfo() {
    this.#cardEmptyComponent = new CardEmptyView(this.#filterType);
    render(this.#cardEmptyComponent, this.#listComponent.element);
  }

  #renderMoreButton = () => {
    this.#moreButtonComponent = new MoreButtonView();
    this.#moreButtonComponent.setClickHandler(this.#handleMoreButtonClick);
    render(this.#moreButtonComponent, this.#listComponent.element);
  };

  #renderBoard() {
    render(this.#containerComponent, this.#listComponent.element);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const films = this.films;
    const filmCount = films.length;
    this.#renderMainContainer();
    this.#renderList();
    if (filmCount === 0) {
      this.#renderCardEmptyInfo();
      return;
    }
    this.#renderSort();
    this.#renderFilms(films.slice(0, Math.min(filmCount, this.#renderedFilmCount)));
    if (filmCount > this.#renderedFilmCount) {
      this.#renderMoreButton();
    }
  }

  #clearBoard = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#moreButtonComponent);

    if (this.#cardEmptyComponent) {
      remove(this.#cardEmptyComponent);
    }

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DEFAULT;
    }
  };

  #renderMainContainer() {
    render(this.#listComponent, this.#boardComponent.element);
  }

  #renderList() {
    render(this.#boardComponent, this.#boardContainer);
  }

  #renderLoading = () => {
    render(this.#loadingComponent, this.#listComponent.element);
  };
}
