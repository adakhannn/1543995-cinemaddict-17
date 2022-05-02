import {generateFilm} from '../mock/film';

export default class PopupModel {
  films = Array.from({length: 1}, generateFilm);

  getFilms = () => this.films;
}
