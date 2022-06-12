import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  };

  #adaptToServer = (film) => {
    const adaptedRelease = {...film.filmInfo.release,
      'release_country': film.filmInfo.release.releaseCountry,
    };
    const adaptedUserDetails = {...film.filmInfo.userDetails,
      'watchlist': film.filmInfo.userDetails.watchList,
      'already_watched': film.filmInfo.userDetails.alreadyWatched,
      'watching_date': film.filmInfo.userDetails.watchingDate,
    };
    const adaptedFilmInfo = {...film.filmInfo,
      'release': adaptedRelease,
      'alternative_title': film.filmInfo.alternativeTitle,
      'total_rating': film.filmInfo.totalRating,
      'age_rating': film.filmInfo.ageRating,
    };
    const adaptedFilm = {...film,
      'film_info': adaptedFilmInfo,
      'user_details': adaptedUserDetails,
    };

    delete adaptedFilm.film_info.release.releaseCountry;
    delete adaptedFilm.user_details.watchList;
    delete adaptedFilm.user_details.alreadyWatched;
    delete adaptedFilm.user_details.watchingDate;
    delete adaptedFilm.film_info.alternativeTitle;
    delete adaptedFilm.film_info.totalRating;
    delete adaptedFilm.film_info.ageRating;
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.film_info.userDetails;

    return adaptedFilm;
  };
}
