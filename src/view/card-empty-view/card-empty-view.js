import AbstractView from '../../framework/view/abstract-view';
import {cardEmptyTemplate} from './card-empty-tpl';

export default class CardEmptyView extends AbstractView {
  get template() {
    return cardEmptyTemplate();
  }
}
