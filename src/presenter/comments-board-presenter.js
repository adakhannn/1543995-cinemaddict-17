import {render, RenderPosition} from '../framework/render';
import CommentsCountView from '../view/comments-container-view/comments-count-view';
import CommentPresenter from './comment-presenter';
import CommentsListView from '../view/comments-list-view/comments-list-view';
import {USER_ACTION} from '../consts';

export default class CommentsBoardPresenter {
  #commentsContainer = null;
  #commentsModel = null;
  #commentsCountComponent = null;
  #commentsListComponent = new CommentsListView();
  #commentsPresenter = new Map();

  constructor(commentsContainer, commentsModel) {
    this.#commentsContainer = commentsContainer;
    this.#commentsModel = commentsModel;
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  init() {
    this.#renderCommentsBoard();
  }

  #renderCommentsBoard() {
    const comments = this.comments;
    const commentsCount = comments.length;
    this.#commentsCountComponent = new CommentsCountView(commentsCount);
    render(this.#commentsListComponent, this.#commentsContainer, RenderPosition.AFTERBEGIN);
    render(this.#commentsCountComponent, this.#commentsContainer, RenderPosition.AFTERBEGIN);
    this.#renderComments(comments);
  }

  #renderComment(comment) {
    const commentPresenter = new CommentPresenter(this.#commentsListComponent.element, this.#handleCommentsViewAction);
    commentPresenter.init(comment);
    this.#commentsPresenter.set(comment.id, commentPresenter);
  }

  #renderComments(comments) {
    comments.forEach((comment) => this.#renderComment(comment));
  }

  #handleCommentsViewAction = (actionType, update) => {
    switch (actionType) {
      case USER_ACTION.ADD:
        this.#commentsModel.addComment(update);
        break;
      case USER_ACTION.DELETE:
        this.#commentsModel.deleteComment(update);
        break;
    }
  };
}
