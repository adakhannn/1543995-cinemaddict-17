import Observable from '../framework/observable';
import {generateFilm} from '../mock/films';
export default class FilmsModel extends Observable {
  #filmsApiService = null;
  #films = Array.from({length: 22}, generateFilm);

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;

    this.#filmsApiService.films.then((films) => {
      console.log(films.map(this.#adaptToClient));
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"
    });
  }

  get films() {
    return this.#films;
  }

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addFilm = (updateType, update) => {
    this.#films = [
      update,
      ...this.#films,
    ];

    this._notify(updateType, update);
  };

  deleteFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType);
  };

  #adaptToClient = (film) => {
    const adaptedRelease = {...film['film_info']['release'],
      releaseCountry: film['film_info']['release']['release_country'],
    };
    const adaptedUserDetails = {...film['user_details'],
      watchList: film['user_details']['watchlist'],
      alreadyWatched: film['user_details']['already_watched'],
      watchingDate: film['user_details']['watching_date'],
    };
    const adaptedFilmInfo = {...film['film_info'],
      release: adaptedRelease,
      userDetails: adaptedUserDetails,
      alternativeTitle: film['film_info']['alternative_title'],
      totalRating: film['film_info']['total_rating'],
      ageRating: film['film_info']['age_rating'],
    };
    const adaptedFilm = {...film,
      filmInfo: adaptedFilmInfo,
    };

    delete adaptedFilm['filmInfo']['release']['release_country'];
    delete adaptedFilm['filmInfo']['userDetails']['watchlist'];
    delete adaptedFilm['filmInfo']['userDetails']['already_watched'];
    delete adaptedFilm['filmInfo']['userDetails']['watching_date'];
    delete adaptedFilm['filmInfo']['alternative_title'];
    delete adaptedFilm['filmInfo']['total_rating'];
    delete adaptedFilm['filmInfo']['age_rating'];
    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];

    return adaptedFilm;
  };
}
