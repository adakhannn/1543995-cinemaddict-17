import AbstractView from '../../framework/view/abstract-view';
import {popupTemplate} from './popup-tpl';

export default class PopupView extends AbstractView {
  #film = null;
  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return popupTemplate(this.#film);
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  };

  setPopupWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  setPopupAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setPopupFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchListClick();
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
