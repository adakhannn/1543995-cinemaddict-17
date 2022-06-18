import {COMMENT_UPDATE_TYPE, USER_ACTION} from '../consts';
import {remove, render, RenderPosition} from '../framework/render';
import CommentsCountView from '../view/comments-container-view/comments-count-view';
import CommentsBoardView from '../view/comments-board-view/comments-board-view';
import NewCommentView from '../view/new-comment-view/new-comment-view';
import LoadingView from '../view/loading-view/loading-view';
import CommentPresenter from './comment-presenter';
import {isEnterKey} from '../utils/common';

export default class CommentsBoardPresenter {
  #comments = null;
  #commentsContainer = null;
  #commentsModel = null;
  #commentsCountComponent = null;
  #commentsBoardComponent = new CommentsBoardView();
  #newCommentComponent = new NewCommentView();
  #loadingComponent = new LoadingView();
  #commentsPresenter = new Map();

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
    document.addEventListener('keydown', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    if(evt.ctrlKey && isEnterKey(evt)) {
      evt.preventDefault();
      const {_state} = this.#newCommentComponent;
      if (_state.newComment && _state.checkedEmoji) {
        this.#handleFormSubmit({comment: _state.newComment, emotion: _state.checkedEmoji});
      }
    }
  };

  #renderCommentsBoard() {
    this.#comments = this.comments;
    render(this.#commentsBoardComponent, this.#commentsContainer, RenderPosition.AFTERBEGIN);
    this.#renderCommentsCount(this.#comments.length);
    this.#renderComments(this.#comments);
    this.#renderNewComment();
  }

  #renderCommentsCount(commentsCount) {
    this.#commentsCountComponent = new CommentsCountView(commentsCount);
    render(this.#commentsCountComponent, this.#commentsBoardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#commentsBoardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #clearComments = () => {
    this.#commentsPresenter.forEach((presenter) => presenter.destroy());
    this.#commentsPresenter.clear();
  };

  #renderComment(comment) {
    const commentPresenter = new CommentPresenter(this.#commentsBoardComponent.element.querySelector('.film-details__comments-list'), this.#handleCommentsViewAction);
    commentPresenter.init(comment);
    this.#commentsPresenter.set(comment.id, commentPresenter);
  }

  #renderComments(comments) {
    comments.forEach((comment) => this.#renderComment(comment));
  }

  #renderNewComment() {
    render(this.#newCommentComponent, this.#commentsBoardComponent.element, RenderPosition.BEFOREEND);
    this.#newCommentComponent.setEmojiChangeHandler(this.#handleEmojiChange);
    this.#newCommentComponent.setTextareaChangeHandler();
  }

  setSaving = () => {
    this.#newCommentComponent.updateElement({
      isDisabled: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#newCommentComponent.updateElement({
        isDisabled: false
      });
    };
    this.#newCommentComponent.shake(resetFormState);
  };

  #handleCommentsViewAction = async (actionType, update) => {
    switch (actionType) {
      case USER_ACTION.ADD:
        remove(this.#commentsCountComponent);
        this.#renderLoading();
        this.setSaving();
        try {
          await this.#commentsModel.addComment(COMMENT_UPDATE_TYPE.ADD, update);
        } catch(err) {
          this.setAborting();
          remove(this.#loadingComponent);
          this.#renderCommentsCount(this.#comments.length);
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
        remove(this.#commentsCountComponent);
        this.#renderCommentsCount(update.length);
        this.#clearComments();
        this.#renderComments(update);
        break;
      case COMMENT_UPDATE_TYPE.ADD:
        remove(this.#loadingComponent);
        remove(this.#commentsCountComponent);
        this.#renderCommentsCount(update.length);
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
