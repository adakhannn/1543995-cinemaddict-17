import {commentTemplate} from './comment-tpl';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';

export default class CommentView extends AbstractStatefulView {
  #comment = null;
  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return commentTemplate(this.#comment);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#commentDeleteClickHandler);
  };

  #commentDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick();
  };

  _restoreHandlers = () => {
    this.setDeleteClickHandler(this._callback.deleteClick);
  };
}
