import AbstractView from '../../framework/view/abstract-view';
import {listTitleTemplate} from './list-title-tpl';

export default class ListTitleView extends AbstractView {
  get template() {
    return listTitleTemplate();
  }
}
