import AbstractView from '../../framework/view/abstract-view';
import {boardTemplate} from './board.tpl';

export default class BoardView extends AbstractView {
  get template() {
    return boardTemplate();
  }
}
