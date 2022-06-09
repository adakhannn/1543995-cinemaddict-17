import {remove, render} from '../framework/render';
import CommentView from '../view/comment-view/comment-view';
import {USER_ACTION} from '../consts';

export default class CommentPresenter {
  #commentsContainer = null;
  #commentComponent = null;
  #comment = null;
  #changeCommentsData = null;

  constructor(commentsContainer, changeCommentsData) {
    this.#commentsContainer = commentsContainer;
    this.#changeCommentsData = changeCommentsData;
  }

  init (comment) {
    this.#comment = comment;
    this.#commentComponent = new CommentView(comment);
    this.#commentComponent.setDeleteClickHandler(this.#handleDeleteClick);
    render(this.#commentComponent, this.#commentsContainer);
  }

  destroy = () => {
    remove(this.#commentComponent);
  };

  #handleDeleteClick = () => {
    this.#changeCommentsData(USER_ACTION.DELETE, this.#comment);
  };
}
