import Observable from '../framework/observable.js';
import {UPDATE_TYPE} from '../consts';

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

    this._notify(UPDATE_TYPE.INIT);
  };

  addComment = (update) => {
    this.#comments= [
      update,
      ...this.#comments,
    ];

    this._notify(update);
  };

  deleteComment = async (update) => {
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
      this._notify(UPDATE_TYPE.PATCH);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };
}
