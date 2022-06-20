import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import {newCommentTemplate} from './new-comment-tpl';

export default class NewCommentView extends AbstractStatefulView {
  constructor(newCommentState = {}) {
    super();
    this._state = NewCommentView.parseCommentToState(newCommentState);
  }

  get template() {
    return newCommentTemplate(this._state);
  }

  setEmojiChangeHandler = (callback) => {
    this._callback.emojiChange = callback;
    this.element.querySelectorAll('.film-details__emoji-item').forEach((item) => {
      item.addEventListener('change', this.#emojiChangeHandler);
    });
  };

  #emojiChangeHandler = (evt) => {
    evt.preventDefault();
    this.element.querySelectorAll('.film-details__emoji-item').forEach((item) => {
      if (item.checked) {
        this._state.checkedEmoji = item.value;
      }
    });
    this._callback.emojiChange(this._state);
  };

  setTextareaChangeHandler = () => {
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#textareaChangeHandler);
  };

  #textareaChangeHandler = (evt) => {
    evt.preventDefault();
    this._state.newComment = evt.target.value;
  };

  _restoreHandlers = () => {
    this.setEmojiChangeHandler(this._callback.emojiChange);
    this.setTextareaChangeHandler();
  };

  static parseCommentToState = (comment) => ({...comment,
    isDisabled: false,
  });
}
