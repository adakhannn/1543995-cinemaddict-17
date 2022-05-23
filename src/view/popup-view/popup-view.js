import AbstractStatefulView from '../../framework/view/abstract-view';
import {popupTemplate} from './popup-tpl';

export default class PopupView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._state = film;
    if (this._state.scrollPosition) {
      this.element.scrollTop = this._state.scrollPosition;
    }
  }

  get template() {
    return popupTemplate(this._state);
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  };

  setEmojiChangeHandler = (callback) => {
    this._callback.emojiChange = callback;
    this.element.querySelectorAll('.film-details__emoji-item').forEach((item) => {
      item.addEventListener('change', this.#emojiChangeHandler);
    });
  };

  setPopupScrollHandler = () => {
    this.element.addEventListener('scroll', this.#popupScrollHandler);
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

  #emojiChangeHandler = (evt) => {
    evt.preventDefault();
    this.element.querySelectorAll('.film-details__emoji-item').forEach((item) => {
      if (item.checked) {
        this._state.checkedEmoji = item.value;
      }
    });
    this._callback.emojiChange();
  };

  #popupScrollHandler = (evt) => {
    evt.preventDefault();
    this._state.scrollPosition = this.element.scrollTop;
  };
}
