import AbstractView from '../../framework/view/abstract-view';
import {navigationTemplate} from './navigation-tpl';

export default class NavigationView extends AbstractView {
  get template() {
    return navigationTemplate();
  }
}
