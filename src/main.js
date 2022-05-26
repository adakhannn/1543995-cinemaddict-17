import UserNameView from './view/user-name-view/user-name-view';
import FiltersView from './view/filters-view/filters-view';
import StatisticsView from './view/statistics-view/statistics-view';
import {render} from './framework/render';
import BoardPresenter from './presenter/board-presenter';
import FilmModel from './model/film-model';
import {generateFilm} from './mock/film';
import {generateFilter} from './mock/filter';

const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');
const footerStatistics = footer.querySelector('.footer__statistics');

const filmModel = new FilmModel(Array.from({length: 22}, generateFilm));
const boardPresenter = new BoardPresenter(main, filmModel);
const filters = generateFilter(filmModel.films);

render(new UserNameView(), header);
render(new FiltersView(filters), main);
render(new StatisticsView(), footerStatistics);

boardPresenter.init();
