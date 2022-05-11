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

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  }

  #closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }
}
