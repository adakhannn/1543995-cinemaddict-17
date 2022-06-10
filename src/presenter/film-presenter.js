import {remove, render, replace} from '../framework/render';
import {isEscapeKey} from '../utils/common';
import CardView from '../view/card-view/card-view';
import PopupView from '../view/popup-view/popup-view';
import {UPDATE_TYPE} from '../consts.js';
import CommentsModel from '../model/comments-model';
import CommentsApiService from '../comments-api-service';
import CommentsBoardPresenter from './comments-board-presenter';

export default class FilmPresenter {
  #boardContainer = null;
  #cardsContainer = null;
  #changeFilmsData = null;
  #cardComponent = null;
  #popupComponent = null;
  #commentsModel = null;
  #film = null;
  #commentsBoardPresenter = null;

  constructor(boardContainer, cardsContainer, changeFilmsData) {
    this.#boardContainer = boardContainer;
    this.#cardsContainer = cardsContainer;
    this.#changeFilmsData = changeFilmsData;
  }

  init (film) {
    this.#film = film;
    this.#commentsModel = new CommentsModel(new CommentsApiService('https://17.ecmascript.pages.academy/cinemaddict', 'Basic sjkdfhhs4uhjk4'), this.#film);
    this.#commentsModel.init();
    this.#commentsModel.addObserver(this.#handleModelEvent);
    const prevCardComponent = this.#cardComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#cardComponent = new CardView(film);
    this.#popupComponent = new PopupView(film);

    this.#cardComponent.setShowClickHandler(this.#handleAddPopup);
    this.#cardComponent.setCardWatchListClickHandler(this.#handleWatchListClick);
    this.#cardComponent.setCardAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#cardComponent.setCardFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setCloseClickHandler(this.#handleRemovePopup);
    this.#popupComponent.setPopupWatchListClickHandler(this.#handleWatchListClick);
    this.#popupComponent.setPopupAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#popupComponent.setPopupFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setEmojiChangeHandler(this.#handleEmojiChange);
    this.#popupComponent.setTextareaChangeHandler();
    this.#popupComponent.setPopupScrollHandler();

    if (prevCardComponent === null || prevPopupComponent === null) {
      render(this.#cardComponent, this.#cardsContainer);
      return;
    }

    if (this.#cardsContainer.contains(prevCardComponent.element)) {
      replace(this.#cardComponent, prevCardComponent);
    }

    if (this.#boardContainer.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevCardComponent);
    remove(prevPopupComponent);
  }

  destroy = () => {
    remove(this.#cardComponent);
    remove(this.#popupComponent);
  };

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#changeFilmsData(UPDATE_TYPE.PATCH, this.#film);
        break;
      case UPDATE_TYPE.INIT:
        this.#renderCommentsBoard();
        break;
    }
  };

  #addPopup = () => {
    render(this.#popupComponent, this.#boardContainer);
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
      this.#popupComponent.setEscClickHandler();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #renderCommentsBoard() {
    this.#commentsBoardPresenter = new CommentsBoardPresenter(this.#popupComponent.element.querySelector('.film-details__comments-wrap'), this.#commentsModel);
    this.#commentsBoardPresenter.init();
  }

  #handleAddPopup = () => {
    this.#removePopup();
    this.#addPopup();
    this.#popupComponent.setFormSubmitHandler(this.#handleFormSubmit);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleRemovePopup = () => {
    this.#removePopup();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleWatchListClick = () => {
    this.#film.filmInfo.userDetails.watchList = !this.#film.filmInfo.userDetails.watchList;
    this.#changeFilmsData(UPDATE_TYPE.PATCH, this.#film);
  };

  #handleAlreadyWatchedClick = () => {
    this.#film.filmInfo.userDetails.alreadyWatched = !this.#film.filmInfo.userDetails.alreadyWatched;
    this.#changeFilmsData(UPDATE_TYPE.PATCH, this.#film);
  };

  #handleFavoriteClick = () => {
    this.#film.filmInfo.userDetails.favorite = !this.#film.filmInfo.userDetails.favorite;
    this.#changeFilmsData(UPDATE_TYPE.PATCH, this.#film);
  };

  #handleEmojiChange = (film) => {
    this.init(film);
  };

  #handleFormSubmit = (film) => {
    this.#changeFilmsData(UPDATE_TYPE.PATCH, film);
  };
}
