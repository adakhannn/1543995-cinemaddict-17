import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import {moreButtonTemplate} from './more-button-tpl';

export default class MoreButtonView extends AbstractStatefulView {
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

  _restoreHandlers = () => {
    this.setClickHandler(this._callback.click);
  };
}
