import {FILM_COUNT_PER_STEP, SORT_TYPE} from '../consts';
import {remove, render, RenderPosition} from '../framework/render';
import BoardView from '../view/board-view/board-view';
import ListView from '../view/list-view/list-view';
import MoreButtonView from '../view/more-button-view/more-button-view';
import SortView from '../view/sort-view/sort-view';
import CardEmptyView from '../view/card-empty-view/card-empty-view';
import ContainerView from '../view/container-view/container-view';
import FilmPresenter from './film-presenter';
import {updateItem} from '../utils/common';
import {sortFilmDate, sortFilmRating} from '../utils/sort.js';

export default class BoardPresenter {
  #boardContainer = null;
  #filmModel = null;
  #boardFilms = [];

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #boardComponent = new BoardView();
  #sortComponent = new SortView();
  #listComponent = new ListView();
  #containerComponent = new ContainerView();
  #moreButtonComponent = new MoreButtonView();
  #cardEmptyComponent = new CardEmptyView();
  #filmPresenter = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;
  #sourcedBoardFilms = [];

  constructor(boardContainer, filmModel) {
    this.#boardContainer = boardContainer;
    this.#filmModel = filmModel;
  }

  init () {
    this.#boardFilms = [...this.#filmModel.films];
    this.#sourcedBoardFilms = [...this.#filmModel.films];
    this.#renderBoard();
  }

  #renderBoard() {
    this.#renderMainContainer();
    this.#renderList();
    if (this.#boardFilms.length === 0) {
      this.#renderCardEmptyInfo();
      return;
    }
    this.#renderSort();
    this.#renderContainer();
  }

  #renderMainContainer() {
    render(this.#listComponent, this.#boardComponent.element);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearContainer();
    this.#renderContainer();
  };

  #renderSort() {
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderList() {
    render(this.#boardComponent, this.#boardContainer);
  }

  #renderCardEmptyInfo() {
    render(this.#cardEmptyComponent, this.#listComponent.element);
  }

  #renderMoreButton = () => {
    render(this.#moreButtonComponent, this.#listComponent.element);
    this.#moreButtonComponent.setClickHandler(this.#handleMoreButtonClick);
  };

  #renderContainer() {
    render(this.#containerComponent, this.#listComponent.element);
    this.#renderFilms(0, Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP));
    if (this.#boardFilms.length > FILM_COUNT_PER_STEP) {
      this.#renderMoreButton();
    }
  }

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter(this.#boardContainer, this.#containerComponent.element, this.#handleFilmChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderFilms(from, to) {
    this.#boardFilms
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  }

  #handleFilmChange = (updatedFilm) => {
    this.#boardFilms = updateItem(this.#boardFilms, updatedFilm);
    this.#sourcedBoardFilms = updateItem(this.#sourcedBoardFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.DATE:
        this.#boardFilms.sort(sortFilmDate);
        break;
      case SORT_TYPE.RATING:
        this.#boardFilms.sort(sortFilmRating);
        break;
      default:
        this.#boardFilms = [...this.#sourcedBoardFilms];
    }

    this.#currentSortType = sortType;
  };

  #clearContainer = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#moreButtonComponent);
  };

  #handleMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#boardFilms.length) {
      remove(this.#moreButtonComponent);
    }
  };
}
