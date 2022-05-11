import AbstractView from '../../framework/view/abstract-view';
import {moreButtonTemplate} from './more-button-tpl';

export default class MoreButtonView extends AbstractView {
  get template() {
    return moreButtonTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
