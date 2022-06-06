import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async () => {
    try {
      this.#comments = await this.#commentsApiService.comments;
      console.log(this.#comments);
    } catch(err) {
      this.#comments = [];
      console.log(this.#comments);
    }
  };
}
