import Observable from '../framework/observable';
import {UPDATE_TYPE} from '../consts';
export default class FilmsModel extends Observable {
  #filmsApiService = null;
  #films = [];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  get films() {
    return this.#films;
  }

  init = async () => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch(err) {
      this.#films = [];
    }
    this._notify(UPDATE_TYPE.INIT);
  };

  updateFilm = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    try {
      const response = await this.#filmsApiService.updateFilm(update);
      const updatedFilm= this.#adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        updatedFilm,
        ...this.#films.slice(index + 1),
      ];
      this._notify(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t update film');
    }
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
