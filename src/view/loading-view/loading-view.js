import AbstractView from '../../framework/view/abstract-view';
import {loadingTemplate} from './loading-tpl';

export default class LoadingView extends AbstractView {
  get template() {
    return loadingTemplate();
  }
}
