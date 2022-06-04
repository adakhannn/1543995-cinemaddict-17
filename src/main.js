import UserNameView from './view/user-name-view/user-name-view';
import StatisticsView from './view/statistics-view/statistics-view';
import {render} from './framework/render';
import BoardPresenter from './presenter/board-presenter';
import FiltersPresenter from './presenter/filters-presenter';
import FilmsModel from './model/films-model';
import FiltersModel from './model/filters-model.js';
import FilmsApiService from './films-api-service.js';
import {AUTHORIZATION, END_POINT} from './consts';

const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');
const footerStatistics = footer.querySelector('.footer__statistics');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const filtersModel = new FiltersModel();
const boardPresenter = new BoardPresenter(main, filmsModel, filtersModel);
const filtersPresenter = new FiltersPresenter(main, filtersModel, filmsModel);

render(new UserNameView(), header);
render(new StatisticsView(), footerStatistics);

filtersPresenter.init();
boardPresenter.init();
