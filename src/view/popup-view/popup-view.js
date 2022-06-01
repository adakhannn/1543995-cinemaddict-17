import AbstractStatefulView from '../../framework/view/abstract-view';
import {popupTemplate} from './popup-tpl';

export default class PopupView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._state = film;
  }

  get template() {
    return popupTemplate(this._state);
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  };

  setEscClickHandler = () => {
    delete this._state.checkedEmoji;
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
    delete this._state.checkedEmoji;
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
    this.#autoScroll();
  };

  #popupScrollHandler = (evt) => {
    evt.preventDefault();
    this._state.scrollPosition = this.element.scrollTop;
  };

  #autoScroll = () => {
    document.querySelector('.film-details').scrollTo(0,this._state.scrollPosition);
  };

  _restoreHandlers = () => {
    this.setCloseClickHandler(this._callback.closeClick);
    this.setEmojiChangeHandler(this._callback.emojiChange);
    this.setPopupWatchListClickHandler(this._callback.watchListClick);
    this.setPopupFavoriteClickHandler(this._callback.favoriteClick);
    this.setPopupAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
  };
}
