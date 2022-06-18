import AbstractView from '../../framework/view/abstract-view';
import {userNameTemplate} from './user-name-tpl';

export default class UserNameView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return userNameTemplate(this.#films);
  }
}
