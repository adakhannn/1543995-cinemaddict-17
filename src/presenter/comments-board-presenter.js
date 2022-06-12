import {COMMENT_UPDATE_TYPE, USER_ACTION} from '../consts';
import {remove, render, RenderPosition} from '../framework/render';
import CommentPresenter from './comment-presenter';
import CommentsCountView from '../view/comments-container-view/comments-count-view';
import CommentsListView from '../view/comments-list-view/comments-list-view';
import NewCommentView from '../view/new-comment-view/new-comment-view';
import LoadingView from '../view/loading-view/loading-view';

export default class CommentsBoardPresenter {
  #comments = null;
  #commentsCount = null;
  #commentsContainer = null;
  #commentsModel = null;
  #commentsPresenter = new Map();
  #commentsCountComponent = null;
  #commentsListComponent = new CommentsListView();
  #newCommentComponent = new NewCommentView();
  #loadingComponent = new LoadingView();

  constructor(commentsContainer, commentsModel) {
    this.#commentsContainer = commentsContainer;
    this.#commentsModel = commentsModel;
    this.#commentsModel.addObserver(this.#handleCommentsModelEvent);
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
    render(this.#newCommentComponent, this.#commentsContainer, RenderPosition.AFTERBEGIN);
    this.#newCommentComponent.setEmojiChangeHandler(this.#handleEmojiChange);
    this.#newCommentComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#newCommentComponent.setTextareaChangeHandler();
    render(this.#commentsListComponent, this.#commentsContainer, RenderPosition.AFTERBEGIN);
    render(this.#commentsCountComponent, this.#commentsContainer, RenderPosition.AFTERBEGIN);
    this.#renderComments(this.#comments);
  }

  #renderNewComment() {
    render(this.#newCommentComponent, this.#commentsContainer);
    this.#newCommentComponent.setEmojiChangeHandler(this.#handleEmojiChange);
    this.#newCommentComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#newCommentComponent.setTextareaChangeHandler();
  }

  #renderComment(comment) {
    const commentPresenter = new CommentPresenter(this.#commentsListComponent.element, this.#handleCommentsViewAction);
    commentPresenter.init(comment);
    this.#commentsPresenter.set(comment.id, commentPresenter);
  }

  #renderComments(comments) {
    comments.forEach((comment) => this.#renderComment(comment));
  }

  #renderCommentsCount() {
    this.#commentsCountComponent = new CommentsCountView(this.#commentsCount);
    render(this.#commentsCountComponent, this.#commentsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#commentsContainer, RenderPosition.AFTERBEGIN);
  }

  #clearComments = () => {
    this.#commentsPresenter.forEach((presenter) => presenter.destroy());
    this.#commentsPresenter.clear();
  };

  #removeCommentsCount = () => {
    remove(this.#commentsCountComponent);
  };

  #removeLoading = () => {
    remove(this.#loadingComponent);
  };

  /*setSaving = () => {
    this.#newCommentComponent.updateElement({
      isDisabled: true,
    });
  };*/

  setAborting = () => {
    /*const resetFormState = () => {
      this.#newCommentComponent.updateElement({
        isDisabled: false
      });
    };*/

    this.#newCommentComponent.shake();
  };

  #handleCommentsViewAction = async (actionType, update) => {
    switch (actionType) {
      case USER_ACTION.ADD:
        this.#removeCommentsCount();
        this.#renderLoading();
        /*this.setSaving();*/
        try {
          await this.#commentsModel.addComment(COMMENT_UPDATE_TYPE.ADD, update);
        } catch(err) {
          this.setAborting();
          this.#removeLoading();
          this.#renderCommentsCount();
        }
        break;
      case USER_ACTION.DELETE:
        this.#commentsPresenter.get(update.id).setDeleting();
        try {
          await this.#commentsModel.deleteComment(COMMENT_UPDATE_TYPE.DELETE, update);
        } catch(err) {
          this.#commentsPresenter.get(update.id).setAborting();
        }
        break;
    }
  };

  #handleCommentsModelEvent = (updateType, update) => {
    switch (updateType) {
      case COMMENT_UPDATE_TYPE.DELETE:
        this.#removeCommentsCount();
        this.#commentsCount--;
        this.#renderCommentsCount();
        this.#commentsPresenter.get(update.id).destroy();
        break;
      case COMMENT_UPDATE_TYPE.ADD:
        this.#removeLoading();
        this.#removeCommentsCount();
        this.#commentsCount++;
        this.#renderCommentsCount();
        this.#clearComments();
        this.#renderComments(update);
        remove(this.#newCommentComponent);
        this.#newCommentComponent = new NewCommentView();
        this.#renderNewComment();
        break;
    }
  };

  #handleEmojiChange = (newCommentState) => {
    remove(this.#newCommentComponent);
    this.#newCommentComponent = new NewCommentView(newCommentState);
    this.#renderNewComment();
  };

  #handleFormSubmit = (comment) => {
    this.#handleCommentsViewAction(USER_ACTION.ADD, comment);
  };
}
