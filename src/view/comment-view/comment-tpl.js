import he from 'he';
import {humanizeDate} from '../../utils/common';
import dayjs from 'dayjs';

export const commentTemplate = (comment) => {
  const getHumanizeDate = () => {
    if ((humanizeDate(dayjs(), 'YYYY') - humanizeDate(comment.date, 'YYYY')) > 0) {
      return `${humanizeDate(dayjs(), 'YYYY') - humanizeDate(comment.date, 'YYYY')} years ago`;
    }
    if ((humanizeDate(dayjs(), 'MM') - humanizeDate(comment.date, 'MM')) > 0) {
      return `${humanizeDate(dayjs(), 'MM') - humanizeDate(comment.date, 'MM')} month ago`;
    }
    if ((humanizeDate(dayjs(), 'DD') - humanizeDate(comment.date, 'DD')) > 0) {
      return `${humanizeDate(dayjs(), 'DD') - humanizeDate(comment.date, 'DD')} days ago`;
    }
    if ((humanizeDate(dayjs(), 'HH') - humanizeDate(comment.date, 'HH')) > 0) {
      return `${humanizeDate(dayjs(), 'HH') - humanizeDate(comment.date, 'HH')} hours ago`;
    }
    if ((humanizeDate(dayjs(), 'mm') - humanizeDate(comment.date, 'mm')) > 5) {
      return `${humanizeDate(dayjs(), 'mm') - humanizeDate(comment.date, 'mm')} minutes ago`;
    }
    if ((humanizeDate(dayjs(), 'mm') - humanizeDate(comment.date, 'mm')) > 0) {
      return 'a few minutes ago';
    }
    if ((humanizeDate(dayjs(), 'ss') - humanizeDate(comment.date, 'ss')) > 0) {
      return 'now';
    }
  };
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment ? `${he.encode(comment.comment)}` : ''}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${getHumanizeDate()}</span>
          <button class="film-details__comment-delete" ${comment.isDeleting ? 'disabled="disabled"' : ''}>${comment.isDeleting ? 'Deleting..' : 'Delete'}</button>
        </p>
      </div>
    </li>`
  );
};
