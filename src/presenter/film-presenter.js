import {remove, render, replace} from '../framework/render';
import {isEscapeKey} from '../utils/common';
import CardView from '../view/card-view/card-view';
import PopupView from '../view/popup-view/popup-view';
import {AUTHORIZATION, END_POINT, UPDATE_TYPE, USER_ACTION} from '../consts.js';
import CommentPresenter from './comment-presenter';
import CommentsModel from '../model/comments-model';
import CommentsApiService from '../comments-api-service';

export default class FilmPresenter {
  #boardContainer = null;
  #cardsContainer = null;
  #changeFilmsData = null;
  #cardComponent = null;
  #popupComponent = null;
  #commentsModel = null;
  #film = null;
  #comments = null;
  #commentPresenter = new Map();

  constructor(boardContainer, cardsContainer, changeFilmsData) {
    this.#boardContainer = boardContainer;
    this.#cardsContainer = cardsContainer;
    this.#changeFilmsData = changeFilmsData;
  }

  init (film) {
    this.#film = film;
    this.#commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION), film);
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

  #handleCommentsViewAction = (actionType, update) => {
    switch (actionType) {
      case USER_ACTION.ADD:
        this.#commentsModel.addComment(update);
        break;
      case USER_ACTION.DELETE:
        this.#commentsModel.deleteComment(update);
        break;
    }
  };

  #handleModelEvent = () => {
    this.#renderComments();
    this.#changeFilmsData(UPDATE_TYPE.PATCH, this.#film);
  };

  destroy = () => {
    remove(this.#cardComponent);
    remove(this.#popupComponent);
  };

  #renderComment(comments, comment) {
    const commentPresenter = new CommentPresenter(this.#popupComponent.element.querySelector('.film-details__comments-list'), this.#handleCommentsViewAction);
    commentPresenter.init(comment, this.#film);
    this.#commentPresenter.set(comment.id, commentPresenter);
  }

  #renderComments() {
    this.#clearComments();
    this.#comments = this.#commentsModel.comments;
    this.#comments.forEach((comment) => this.#renderComment(this.#comments, comment));
  }

  #clearComments = () => {
    this.#commentPresenter.forEach((presenter) => presenter.destroy());
    this.#commentPresenter.clear();
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

  #handleAddPopup = () => {
    this.#removePopup();
    this.#addPopup();
    this.#popupComponent.setFormSubmitHandler(this.#handleFormSubmit);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#renderComments();
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

  #handleEmojiChange = () => {
    this.#changeFilmsData(UPDATE_TYPE.PATCH, this.#film);
    this.#renderComments();
  };

  #handleFormSubmit = (film) => {
    this.#changeFilmsData(UPDATE_TYPE.PATCH, film);
  };
}
