import AbstractView from '../../framework/view/abstract-view';
import {cardTemplate} from './card-tpl';

export default class CardView extends AbstractView {
  #film = null;
  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return cardTemplate(this.#film);
  }

  setShowClickHandler = (callback) => {
    this._callback.showClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#showClickHandler);
  };

  setCardWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  setCardAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setCardFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #showClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.showClick();
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
