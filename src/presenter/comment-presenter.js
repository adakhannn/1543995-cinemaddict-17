import {USER_ACTION} from '../consts';
import {remove, render} from '../framework/render';
import CommentView from '../view/comment-view/comment-view';

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
    render(this.#commentComponent, this.#commentsContainer);
    this.#commentComponent.setDeleteClickHandler(this.#handleDeleteClick);
  }

  destroy = () => {
    remove(this.#commentComponent);
  };

  setDeleting = () => {
    this.#commentComponent.updateElement({
      isDeleting: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#commentComponent.updateElement({
        isDeleting: false,
      });
    };

    this.#commentComponent.shake(resetFormState);
  };

  #handleDeleteClick = () => {
    this.#changeCommentsData(USER_ACTION.DELETE, this.#comment);
  };
}
