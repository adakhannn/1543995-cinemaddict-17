export const userNameTemplate = (films) => {
  let countWatchedFilms = 0;
  films.forEach((film) => {
    if (film.filmInfo.userDetails.alreadyWatched) {
      countWatchedFilms++;
    }
  });
  if (countWatchedFilms === 0) {
    return `<section class="header__profile profile">
                <p class="profile__rating"></p>
                <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
              </section>`;
  }
  if (countWatchedFilms > 0 && countWatchedFilms < 11) {
    return `<section class="header__profile profile">
                <p class="profile__rating">Novice</p>
                <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
              </section>`;
  }
  if (countWatchedFilms > 10 && countWatchedFilms < 21) {
    return `<section class="header__profile profile">
                <p class="profile__rating">Fan</p>
                <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
              </section>`;
  }
  if (countWatchedFilms > 20) {
    return `<section class="header__profile profile">
                <p class="profile__rating">Movie Buff</p>
                <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
              </section>`;
  }
};
