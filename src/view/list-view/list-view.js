import AbstractView from '../../framework/view/abstract-view';
import {listTemplate} from './list-tpl';

export default class ListView extends AbstractView {
  get template() {
    return listTemplate();
  }
}
