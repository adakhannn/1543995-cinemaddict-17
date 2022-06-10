import {remove, render, RenderPosition} from '../framework/render';
import CommentsCountView from '../view/comments-container-view/comments-count-view';
import CommentPresenter from './comment-presenter';
import CommentsListView from '../view/comments-list-view/comments-list-view';
import {UPDATE_TYPE, USER_ACTION} from '../consts';

export default class CommentsBoardPresenter {
  #commentsContainer = null;
  #commentsModel = null;
  #commentsCountComponent = null;
  #commentsListComponent = new CommentsListView();
  #commentsPresenter = new Map();
  #comments = null;
  #commentsCount = null;

  constructor(commentsContainer, commentsModel) {
    this.#commentsContainer = commentsContainer;
    this.#commentsModel = commentsModel;
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  init() {
    this.#renderCommentsBoard();
  }

  #renderCommentsBoard() {
    this.#comments = this.comments;
    this.#commentsCount = this.#comments.length;
    this.#commentsCountComponent = new CommentsCountView(this.#commentsCount);
    render(this.#commentsListComponent, this.#commentsContainer, RenderPosition.AFTERBEGIN);
    render(this.#commentsCountComponent, this.#commentsContainer, RenderPosition.AFTERBEGIN);
    this.#renderComments(this.#comments);
  }

  #renderComment(comment) {
    const commentPresenter = new CommentPresenter(this.#commentsListComponent.element, this.#handleCommentsViewAction);
    commentPresenter.init(comment);
    this.#commentsPresenter.set(comment.id, commentPresenter);
  }

  #renderComments(comments) {
    comments.forEach((comment) => this.#renderComment(comment));
  }

  #handleModelEvent = (updateType, update) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        remove(this.#commentsCountComponent);
        this.#commentsCount--;
        this.#commentsCountComponent = new CommentsCountView(this.#commentsCount);
        render(this.#commentsCountComponent, this.#commentsContainer, RenderPosition.AFTERBEGIN);
        this.#commentsPresenter.get(update.id).destroy();
        break;
    }
  };

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
