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

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
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
      'user_details': adaptedUserDetails,
      'alternative_title': film.filmInfo.alternativeTitle,
      'total_rating': film.filmInfo.totalRating,
      'age_rating': film.filmInfo.ageRating,
    };
    const adaptedFilm = {...film,
      'film_info': adaptedFilmInfo,
    };

    delete adaptedFilm.filmInfo.release.releaseCountry;
    delete adaptedFilm.filmInfo.userDetails.watchList;
    delete adaptedFilm.filmInfo.userDetails.alreadyWatched;
    delete adaptedFilm.filmInfo.userDetails.watchingDate;
    delete adaptedFilm.filmInfo.alternativeTitle;
    delete adaptedFilm.filmInfo.filmInfo.totalRating;
    delete adaptedFilm.filmInfo.filmInfo.ageRating;

    return adaptedFilm;
  };
}
