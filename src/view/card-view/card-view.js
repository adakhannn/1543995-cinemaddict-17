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

  #showClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.showClick();
  };
}
