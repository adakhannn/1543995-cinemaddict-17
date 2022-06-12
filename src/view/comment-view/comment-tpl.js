import he from 'he';
import {humanizeDate} from '../../utils/common';

export const commentTemplate = (comment) => (
  `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment ? `${he.encode(comment.comment)}` : ''}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${humanizeDate(comment.date, 'DD/MM/YYYY HH:mm')}</span>
          <button class="film-details__comment-delete" ${comment.isDeleting ? 'disabled="disabled"' : ''}>${comment.isDeleting ? 'Deleting..' : 'Delete'}</button>
        </p>
      </div>
    </li>`
);
