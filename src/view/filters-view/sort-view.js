import AbstractView from '../../framework/view/abstract-view';
import {filtersTemplate} from './sort-tpl';

export default class SortView extends AbstractView {
  get template() {
    return filtersTemplate();
  }
}
