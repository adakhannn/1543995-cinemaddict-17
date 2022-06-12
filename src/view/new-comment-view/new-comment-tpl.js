import he from 'he';
import {EMOTIONS} from '../../consts';

export const newCommentTemplate = (state) => {
  let checkedEmoji;
  let newComment;
  const isDisabled = state.isDisabled;
  if (state) {
    if (state.checkedEmoji) {
      checkedEmoji = state.checkedEmoji;
    }
    if (state.newComment) {
      newComment = state.newComment;
    }
  }
  const getEmotionsHtml = () => {
    const EmotionsHtml = [];
    EMOTIONS.forEach((item) => {
      EmotionsHtml.push(
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${item}" value="${item}" ${checkedEmoji === item ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
          <label class="film-details__emoji-label" for="emoji-${item}">
            <img src="./images/emoji/${item}.png" width="30" height="30" alt="emoji">
          </label>`
      );
    });
    return EmotionsHtml;
  };
  return (
    `<div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">${checkedEmoji ? `<img src="./images/emoji/${checkedEmoji}.png" width="70" height="70" alt="${checkedEmoji}">` : ''}</div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="${newComment ? '' : 'Select reaction below and write comment here'}" name="comment" ${isDisabled ? 'disabled' : ''}>${newComment ? `${he.encode(newComment)}` : ''}</textarea>
      </label>

      <div class="film-details__emoji-list">
        ${getEmotionsHtml().join('')}
      </div>
    </div>`
  );
};
