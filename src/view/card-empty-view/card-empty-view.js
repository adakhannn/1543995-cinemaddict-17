import AbstractView from '../../framework/view/abstract-view';
import {cardEmptyTemplate} from './card-empty-tpl';

export default class CardEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return cardEmptyTemplate(this.#filterType);
  }
}
