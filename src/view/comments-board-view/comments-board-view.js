import {commentsBoardTemplate} from './comments-board-tpl';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';

export default class CommentsBoardView extends AbstractStatefulView {
  get template() {
    return commentsBoardTemplate();
  }
}
