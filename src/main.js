import UserNameView from './view/user-name-view/user-name-view';
import NavigationView from './view/navigation-view/navigation-view';
import FiltersView from './view/filters-view/filters-view';
import StatisticsView from './view/statistics-view/statistics-view';
import {render} from './render';
import BoardPresenter from './presenter/board-presenter';
import FilmModel from './model/film-model';

const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');
const footerStatistics = footer.querySelector('.footer__statistics');

const filmModel = new FilmModel();
const boardPresenter = new BoardPresenter();

render(new UserNameView(), header);
render(new NavigationView(), main);
render(new FiltersView(), main);
render(new StatisticsView(), footerStatistics);

boardPresenter.init(main, filmModel);
