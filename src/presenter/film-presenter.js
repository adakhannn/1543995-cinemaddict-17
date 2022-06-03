import {remove, render, replace} from '../framework/render';
import {isEscapeKey} from '../utils/common';
import CardView from '../view/card-view/card-view';
import PopupView from '../view/popup-view/popup-view';
import {USER_ACTION, UPDATE_TYPE} from '../consts.js';
import CommentPresenter from './comment-presenter';

export default class FilmPresenter {
  #boardContainer = null;
  #cardsContainer = null;
  #changeData = null;
  #cardComponent = null;
  #popupComponent = null;
  #film = null;

  constructor(boardContainer, cardsContainer, changeData) {
    this.#boardContainer = boardContainer;
    this.#cardsContainer = cardsContainer;
    this.#changeData = changeData;
  }

  init (film) {
    this.#film = film;

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
    this.#renderComments(this.#film.comments);
  }

  destroy = () => {
    remove(this.#cardComponent);
    remove(this.#popupComponent);
  };

  #renderComment(comment) {
    const commentPresenter = new CommentPresenter(this.#popupComponent.element.querySelector('.film-details__comments-list'), this.#changeData);
    commentPresenter.init(comment, this.#film);
  }

  #renderComments(comments) {
    comments.forEach((comment) => this.#renderComment(comment));
  }

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
    this.#renderComments(this.#film.comments);
    this.#popupComponent.setFormSubmitHandler(this.#handleFormSubmit);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeData(USER_ACTION.UPDATE, UPDATE_TYPE.PATCH, this.#film);
  };

  #handleRemovePopup = () => {
    this.#removePopup();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleWatchListClick = () => {
    this.#film.filmInfo.userDetails.watchList = !this.#film.filmInfo.userDetails.watchList;
    this.#changeData(USER_ACTION.UPDATE, UPDATE_TYPE.PATCH, this.#film);
  };

  #handleAlreadyWatchedClick = () => {
    this.#film.filmInfo.userDetails.alreadyWatched = !this.#film.filmInfo.userDetails.alreadyWatched;
    this.#changeData(USER_ACTION.UPDATE, UPDATE_TYPE.PATCH, this.#film);
  };

  #handleFavoriteClick = () => {
    this.#film.filmInfo.userDetails.favorite = !this.#film.filmInfo.userDetails.favorite;
    this.#changeData(USER_ACTION.UPDATE, UPDATE_TYPE.PATCH, this.#film);
  };

  #handleEmojiChange = () => {
    this.#changeData(USER_ACTION.UPDATE, UPDATE_TYPE.PATCH, this.#film);
  };

  #handleFormSubmit = (film) => {
    this.#changeData(USER_ACTION.UPDATE, UPDATE_TYPE.PATCH, film);
  };
}
