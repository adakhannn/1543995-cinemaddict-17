import {COMMENT_UPDATE_TYPE, FILM_UPDATE_TYPE} from '../consts.js';
import {remove, render, replace} from '../framework/render';
import CommentsModel from '../model/comments-model';
import CardView from '../view/card-view/card-view';
import PopupView from '../view/popup-view/popup-view';
import filmControlsView from '../view/film-controls-view/film-controls-view';
import CommentsBoardPresenter from './comments-board-presenter';
import CommentsApiService from '../comments-api-service';
import {isEscapeKey} from '../utils/common';

export default class FilmPresenter {
  #film = null;
  #filmsModel = null;
  #commentsModel = null;
  #boardContainer = null;
  #cardsContainer = null;
  #cardComponent = null;
  #popupComponent = null;
  #filmControlsComponent = null;
  #commentsBoardPresenter = null;

  constructor(boardContainer, cardsContainer, filmsModel) {
    this.#boardContainer = boardContainer;
    this.#cardsContainer = cardsContainer;
    this.#filmsModel = filmsModel;
  }

  init (film) {
    const prevCardComponent = this.#cardComponent;
    const prevPopupComponent = this.#popupComponent;
    this.#film = film;
    this.#cardComponent = new CardView(film);
    this.#popupComponent = new PopupView(film);
    this.#filmControlsComponent = new filmControlsView(film);
    this.#cardComponent.setShowClickHandler(this.#handleAddPopup);
    this.#cardComponent.setCardWatchListClickHandler(this.#handleWatchListClick);
    this.#cardComponent.setCardAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#cardComponent.setCardFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setCloseClickHandler(this.#handleRemovePopup);
    this.#filmControlsComponent.setPopupWatchListClickHandler(this.#handleWatchListClick);
    this.#filmControlsComponent.setPopupAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmControlsComponent.setPopupFavoriteClickHandler(this.#handleFavoriteClick);
    if (prevCardComponent === null || prevPopupComponent === null) {
      render(this.#cardComponent, this.#cardsContainer);
      return;
    }
    if (this.#cardsContainer.contains(prevCardComponent.element)) {
      replace(this.#cardComponent, prevCardComponent);
    }
    if (this.#boardContainer.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
      render(this.#filmControlsComponent, this.#popupComponent.element.querySelector('.film-details__top-container'));
      this.#renderCommentsBoard();
    }
    remove(prevCardComponent);
    remove(prevPopupComponent);
  }

  destroy = () => {
    remove(this.#cardComponent);
    remove(this.#popupComponent);
  };

  #handleFilmsViewAction = async (updateType, update) => {
    try {
      await this.#filmsModel.updateFilm(updateType, update);
    } catch(err) {
      this.#filmControlsComponent.shake();
    }
  };

  #handleCommentsModelEvent = (updateType) => {
    if (updateType === COMMENT_UPDATE_TYPE.INIT) {
      this.#renderCommentsBoard();
    }
  };

  #addPopup = () => {
    render(this.#popupComponent, this.#boardContainer);
    render(this.#filmControlsComponent, this.#popupComponent.element.querySelector('.film-details__top-container'));
    this.#boardContainer.parentElement.classList.add('hide-overflow');
  };

  #removePopup = () => {
    const allPopups = this.#boardContainer.querySelectorAll('.film-details');
    allPopups.forEach((item) => {
      this.#boardContainer.removeChild(item);
    });
    this.#boardContainer.parentElement.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#removePopup();
      this.#handleFilmsViewAction(FILM_UPDATE_TYPE.PATCH, this.#film);
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #renderCommentsBoard() {
    this.#commentsBoardPresenter = new CommentsBoardPresenter(this.#popupComponent.element.querySelector('.film-details__bottom-container'), this.#commentsModel);
    this.#commentsBoardPresenter.init();
  }

  #handleAddPopup = () => {
    this.#removePopup();
    this.#addPopup();
    this.#commentsModel = new CommentsModel(new CommentsApiService(), this.#film);
    this.#commentsModel.init();
    this.#commentsModel.addObserver(this.#handleCommentsModelEvent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleRemovePopup = () => {
    this.#removePopup();
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#handleFilmsViewAction(FILM_UPDATE_TYPE.PATCH, this.#film);
  };

  #handleWatchListClick = () => {
    this.#film.filmInfo.userDetails.watchList = !this.#film.filmInfo.userDetails.watchList;
    this.#handleFilmsViewAction(FILM_UPDATE_TYPE.PATCH, this.#film);
  };

  #handleAlreadyWatchedClick = () => {
    this.#film.filmInfo.userDetails.alreadyWatched = !this.#film.filmInfo.userDetails.alreadyWatched;
    this.#handleFilmsViewAction(FILM_UPDATE_TYPE.PATCH, this.#film);
  };

  #handleFavoriteClick = () => {
    this.#film.filmInfo.userDetails.favorite = !this.#film.filmInfo.userDetails.favorite;
    this.#handleFilmsViewAction(FILM_UPDATE_TYPE.PATCH, this.#film);
  };
}
