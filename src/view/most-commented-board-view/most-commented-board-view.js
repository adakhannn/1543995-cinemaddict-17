import AbstractView from '../../framework/view/abstract-view';
import {mostCommentedBoardTemplate} from './most-commented-board-tpl';

export default class MostCommentedBoardView extends AbstractView {
  get template() {
    return mostCommentedBoardTemplate();
  }
}
