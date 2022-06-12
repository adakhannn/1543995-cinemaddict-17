import AbstractStatefulView from '../../framework/view/abstract-view';
import {filmControlsTemplate} from './film-controls-tpl';

export default class filmControlsView extends AbstractStatefulView {
  #film = null;
  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return filmControlsTemplate(this.#film);
  }

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

  _restoreHandlers = () => {
    this.setPopupWatchListClickHandler(this._callback.watchListClick);
    this.setPopupFavoriteClickHandler(this._callback.favoriteClick);
    this.setPopupAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
  };
}
