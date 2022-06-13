import AbstractStatefulView from '../../framework/view/abstract-view';
import {newCommentTemplate} from './new-comment-tpl';
import {isEnterKey} from '../../utils/common';

export default class NewCommentView extends AbstractStatefulView {
  constructor(newCommentState = {}) {
    super();
    this._state = NewCommentView.parseCommentToState(newCommentState);
  }

  get template() {
    return newCommentTemplate(this._state);
  }

  static parseCommentToState = (comment) => ({...comment,
    isDisabled: false,
  });

  static parseStateToComment = (state) => ({
    comment:    state.newComment,
    emotion:    state.checkedEmoji,
  });

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

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    document.addEventListener('keydown', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    if(evt.ctrlKey && isEnterKey(evt)) {
      evt.preventDefault();
      if (this._state.newComment !== undefined && this._state.checkedEmoji !== undefined) {
        this._callback.formSubmit(NewCommentView.parseStateToComment(this._state));
      }
    }
  };

  _restoreHandlers = () => {
    this.setEmojiChangeHandler(this._callback.emojiChange);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setTextareaChangeHandler();
  };
}
