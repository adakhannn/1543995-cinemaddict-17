import AbstractView from '../../framework/view/abstract-view';
import {commentsListTemplate} from './comments-list-tpl';

export default class CommentsListView extends AbstractView {
  get template() {
    return commentsListTemplate();
  }
}
