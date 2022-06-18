import {COMMENT_UPDATE_TYPE} from '../consts';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];
  #film = null;

  constructor(commentsApiService, film) {
    super();
    this.#film = film;
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async () => {
    try {
      this.#comments = await this.#commentsApiService.getComments(this.#film.id);
    } catch(err) {
      this.#comments = [];
    }
    this._notify(COMMENT_UPDATE_TYPE.INIT);
  };

  addComment = async (updateType, update) => {
    try {
      const newComment = await this.#commentsApiService.addComment(update, this.#film.id);
      this.#comments = newComment.comments;
      this._notify(updateType, this.#comments);
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }
    try {
      await this.#commentsApiService.deleteComment(update);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];
      this._notify(updateType, this.#comments);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };
}
