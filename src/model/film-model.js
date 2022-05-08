import {generateFilm} from '../mock/film';

export default class FilmModel {
  #films = Array.from({length: 3}, generateFilm);

  get films() {
    return this.#films;
  }
}
