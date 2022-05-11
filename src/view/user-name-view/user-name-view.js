import AbstractView from '../../framework/view/abstract-view';
import {userNameTemplate} from './user-name-tpl';

export default class UserNameView extends AbstractView {
  get template() {
    return userNameTemplate();
  }
}
