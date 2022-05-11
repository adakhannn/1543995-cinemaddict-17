import AbstractView from '../../framework/view/abstract-view';
import {containerTemplate} from './container-tpl';

export default class ContainerView extends AbstractView {
  get template() {
    return containerTemplate();
  }
}
