import AbstractView from '../../framework/view/abstract-view';
import {topRatedBoardTemplate} from './top-rated-board-tpl';

export default class TopRatedBoardView extends AbstractView {
  get template() {
    return topRatedBoardTemplate();
  }
}
