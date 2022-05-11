import UserNameView from './view/user-name-view/user-name-view';
import NavigationView from './view/navigation-view/navigation-view';
import StatisticsView from './view/statistics-view/statistics-view';
import {render} from './framework/render';
import BoardPresenter from './presenter/board-presenter';
import FilmModel from './model/film-model';
import {generateFilm} from './mock/film';

const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');
const footerStatistics = footer.querySelector('.footer__statistics');

const filmModel = new FilmModel(Array.from({length: 22}, generateFilm));
const boardPresenter = new BoardPresenter(main, filmModel);

render(new UserNameView(), header);
render(new NavigationView(), main);
render(new StatisticsView(), footerStatistics);

boardPresenter.init();
