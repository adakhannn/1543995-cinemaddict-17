import UserNameView from './view/user-name-view/user-name-view.js';
import NavigationView from './view/navigation-view/navigation-view.js';
import FiltersView from './view/filters-view/filters-view.js';
import StatisticsView from './view/statistics-view/statistics-view';
import PopupView from './view/popup-view/popup-view';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');
const footerStatistics = footer.querySelector('.footer__statistics');
const boardPresenter = new BoardPresenter();

render(new UserNameView(), header);
render(new NavigationView(), main);
render(new FiltersView(), main);
render(new StatisticsView(), footerStatistics);
render(new PopupView(), body);

boardPresenter.init(main);
