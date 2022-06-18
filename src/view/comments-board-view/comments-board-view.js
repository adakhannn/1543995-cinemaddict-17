import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import {commentsBoardTemplate} from './comments-board-tpl';

export default class CommentsBoardView extends AbstractStatefulView {
  get template() {
    return commentsBoardTemplate();
  }
}
