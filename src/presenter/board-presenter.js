import {FILM_COUNT_PER_STEP, SORT_TYPE, FILM_UPDATE_TYPE, FILTER_TYPE} from '../consts';
import {remove, render, RenderPosition} from '../framework/render';
import FilmPresenter from './film-presenter';
import BoardView from '../view/board-view/board-view';
import ListView from '../view/list-view/list-view';
import MoreButtonView from '../view/more-button-view/more-button-view';
import SortView from '../view/sort-view/sort-view';
import CardEmptyView from '../view/card-empty-view/card-empty-view';
import ContainerView from '../view/container-view/container-view';
import LoadingView from '../view/loading-view/loading-view';
import UserNameView from '../view/user-name-view/user-name-view';
import StatisticsView from '../view/statistics-view/statistics-view';
import TopRatedBoardView from '../view/top-rated-board-view/top-rated-board-view';
import MostCommentedBoardView from '../view/most-commented-board-view/most-commented-board-view';
import {filterInfo} from '../utils/filter.js';
import {sortCommentsLength, sortFilmDate, sortFilmRating} from '../utils/sort.js';

export default class BoardPresenter {
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #currentSortType = SORT_TYPE.DEFAULT;
  #filterType = FILTER_TYPE.ALL;
  #isLoading = true;
  #boardContainer = null;
  #userNameContainer  = null;
  #statisticsContainer  = null;
  #filmsModel = null;
  #filtersModel = null;
  #sortComponent = null;
  #moreButtonComponent = null;
  #cardEmptyComponent = null;
  #boardComponent = new BoardView();
  #listComponent = new ListView();
  #topRatedBoardComponent = new TopRatedBoardView();
  #mostCommentedBoardComponent = new MostCommentedBoardView();
  #containerComponent = new ContainerView();
  #loadingComponent = new LoadingView();
  #userNameComponent = null;
  #statisticsComponent = null;
  #filmPresenter = new Map();
  #topRatedFilmsPresenter = new Map();
  #mostCommentedFilmsPresenter = new Map();

  constructor(boardContainer, filmsModel, filtersModel, userNameContainer, statisticsContainer) {
    this.#boardContainer = boardContainer;
    this.#userNameContainer = userNameContainer;
    this.#statisticsContainer = statisticsContainer;
    this.#filmsModel = filmsModel;
    this.#filtersModel = filtersModel;
    this.#filmsModel.addObserver(this.#handleFilmsModelEvent);
    this.#filtersModel.addObserver(this.#handleFilmsModelEvent);
  }

  get films() {
    this.#filterType = this.#filtersModel.filterType;
    const films = this.#filmsModel.films;
    const filteredFilms = filterInfo[this.#filterType](films);
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
    this.#renderFilms(films, this.#containerComponent.element);
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

  #handleFilmsModelEvent = (updateType, data) => {
    switch (updateType) {
      case FILM_UPDATE_TYPE.PATCH:
        remove(this.#userNameComponent);
        this.#userNameComponent = new UserNameView(this.#filmsModel.films);
        render(this.#userNameComponent, this.#userNameContainer);
        this.#clearTopRateBoard();
        this.#renderTopRatedBoard();
        this.#clearMostCommentedBoard();
        this.#renderMostCommentedBoard();
        this.#filmPresenter.get(data.id).init(data);
        break;
      case FILM_UPDATE_TYPE.MAJOR:
        this.#clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this.#renderBoard();
        break;
      case FILM_UPDATE_TYPE.INIT:
        this.#userNameComponent = new UserNameView(this.#filmsModel.films);
        render(this.#userNameComponent, this.#userNameContainer);
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        this.#renderStatistics();
        break;
    }
  };

  #renderSort() {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderStatistics() {
    this.#statisticsComponent = new StatisticsView(this.films);
    render(this.#statisticsComponent, this.#statisticsContainer);
  }

  #renderFilm(film, renderContainer) {
    const filmPresenter = new FilmPresenter(this.#boardContainer, renderContainer, this.#filmsModel);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderFilms(films, renderContainer) {
    films.forEach((film) => this.#renderFilm(film, renderContainer));
  }

  #renderTopRatedFilm(film, renderContainer) {
    const topRatedFilmsPresenter = new FilmPresenter(this.#boardContainer, renderContainer, this.#filmsModel);
    topRatedFilmsPresenter.init(film);
    this.#topRatedFilmsPresenter.set(film.id, topRatedFilmsPresenter);
  }

  #renderTopRatedFilms(films, renderContainer) {
    films.forEach((film) => this.#renderTopRatedFilm(film, renderContainer));
  }

  #renderMostCommentedFilm(film, renderContainer) {
    const mostCommentedFilmsPresenter = new FilmPresenter(this.#boardContainer, renderContainer, this.#filmsModel);
    mostCommentedFilmsPresenter.init(film);
    this.#mostCommentedFilmsPresenter.set(film.id, mostCommentedFilmsPresenter);
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
    const films = this.films;
    const filmCount = films.length;
    this.#renderMainContainer();
    this.#renderList();
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (filmCount === 0) {
      this.#renderCardEmptyInfo();
      return;
    }
    this.#renderSort();
    this.#renderFilms(films.slice(0, Math.min(filmCount, this.#renderedFilmCount)), this.#containerComponent.element);
    if (filmCount > this.#renderedFilmCount) {
      this.#renderMoreButton();
    }
    this.#renderTopRatedBoard();
    this.#renderMostCommentedBoard();
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
    this.#renderedFilmCount = resetRenderedFilmCount ? FILM_COUNT_PER_STEP : Math.min(filmCount, this.#renderedFilmCount);
    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DEFAULT;
    }
    this.#clearTopRateBoard();
    this.#clearMostCommentedBoard();
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

  #renderTopRatedBoard = () => {
    const films = this.#filmsModel.films;
    const topTwoRatedFilms = films.sort(sortFilmRating).slice(0, 2);
    if (topTwoRatedFilms) {
      render(this.#topRatedBoardComponent, this.#boardComponent.element);
      this.#renderTopRatedFilms(topTwoRatedFilms, this.#topRatedBoardComponent.element.querySelector('.films-list__container'));
    }
  };

  #clearTopRateBoard = () => {
    remove(this.#topRatedBoardComponent);
    this.#topRatedFilmsPresenter.forEach((presenter) => presenter.destroy());
    this.#topRatedFilmsPresenter.clear();
  };

  #renderMostCommentedBoard = () => {
    const films = this.#filmsModel.films;
    const topTwoCommentedFilms = films.sort(sortCommentsLength).slice(0, 2);
    if (topTwoCommentedFilms[0].comments.length !== 0) {
      render(this.#mostCommentedBoardComponent, this.#boardComponent.element);
      topTwoCommentedFilms.forEach((film) => {
        if (film.comments.length > 0) {
          this.#renderMostCommentedFilm(film, this.#mostCommentedBoardComponent.element.querySelector('.films-list__container'));
        }
      });
    }
  };

  #clearMostCommentedBoard = () => {
    remove(this.#mostCommentedBoardComponent);
    this.#mostCommentedFilmsPresenter.forEach((presenter) => presenter.destroy());
    this.#mostCommentedFilmsPresenter.clear();
  };
}
