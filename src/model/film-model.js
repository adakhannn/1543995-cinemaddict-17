export default class FilmModel {
  #films = null;
  constructor(film) {
    this.#films = film;
  }

  get films() {
    return this.#films;
  }
}
