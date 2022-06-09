import AbstractView from '../../framework/view/abstract-view';
import {commentsCountTemplate} from './comments-count-tpl';

export default class CommentsCountView extends AbstractView {
  #commentsCount = null;
  constructor(commentsCount) {
    super();
    this.#commentsCount = commentsCount;
  }

  get template() {
    return commentsCountTemplate(this.#commentsCount);
  }
}
