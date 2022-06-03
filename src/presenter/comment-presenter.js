import {render} from '../framework/render';
import CommentView from '../view/comment-view/comment-view';
import {UPDATE_TYPE, USER_ACTION} from '../consts';

export default class CommentPresenter {
  #commentsContainer = null;
  #commentComponent = null;
  #film = null;
  #comment = null;
  #changeData = null;

  constructor(commentsContainer, changeData) {
    this.#commentsContainer = commentsContainer;
    this.#changeData = changeData;
  }

  init (comment, film) {
    this.#film = film;
    this.#comment = comment;
    this.#commentComponent = new CommentView(comment);
    this.#commentComponent.setDeleteClickHandler(this.#handleDeleteClick);
    render(this.#commentComponent, this.#commentsContainer);
  }

  #handleDeleteClick = () => {
    const index = this.#film.comments.findIndex((comment) => comment.id === this.#comment.id);
    if (index !== -1) {
      this.#film.comments.splice(index, 1);
    }
    this.#changeData(USER_ACTION.UPDATE, UPDATE_TYPE.PATCH, this.#film);
  };
}
