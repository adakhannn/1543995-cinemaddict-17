import AbstractView from '../../framework/view/abstract-view';
import {statisticsTemplate} from './statistics-tpl';

export default class StatisticsView extends AbstractView {
  get template() {
    return statisticsTemplate();
  }
}
