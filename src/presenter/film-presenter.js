import {remove, render, replace} from '../framework/render';
import {isEscapeKey} from '../utils';
import CardView from '../view/card-view/card-view';
import PopupView from '../view/popup-view/popup-view';

export default class FilmPresenter {
  #boardContainer = null;
  #cardsContainer = null;
  #changeData = null;
  #cardComponent = null;
  #popupComponent = null;
  #film = null;

  constructor(boardContainer, cardsContainer, changeData) {
    this.#boardContainer = boardContainer;
    this.#cardsContainer = cardsContainer;
    this.#changeData = changeData;
  }

  init (film) {
    this.#film = film;

    const prevCardComponent = this.#cardComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#cardComponent = new CardView(film);
    this.#popupComponent = new PopupView(film);

    this.#cardComponent.setShowClickHandler(this.#handleAddPopup);
    this.#cardComponent.setCardWatchListClickHandler(this.#handleWatchListClick);
    this.#cardComponent.setCardAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#cardComponent.setCardFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setCloseClickHandler(this.#handleRemovePopup);
    this.#popupComponent.setPopupWatchListClickHandler(this.#handleWatchListClick);
    this.#popupComponent.setPopupAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#popupComponent.setPopupFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setEmojiChangeHandler(this.#handleEmojiChange);
    this.#popupComponent.setPopupScrollHandler();

    if (prevCardComponent === null || prevPopupComponent === null) {
      render(this.#cardComponent, this.#cardsContainer);
      return;
    }

    if (this.#cardsContainer.contains(prevCardComponent.element)) {
      replace(this.#cardComponent, prevCardComponent);
    }

    if (this.#boardContainer.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevCardComponent);
    remove(prevPopupComponent);
  }

  #addPopup = () => {
    render(this.#popupComponent, this.#boardContainer);
    this.#boardContainer.parentElement.classList.add('hide-overflow');
  };

  #removePopup = () => {
    const allPopups = this.#boardContainer.querySelectorAll('.film-details');
    allPopups.forEach((item) => {
      this.#boardContainer.removeChild(item);
    });
    this.#boardContainer.parentElement.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#removePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleAddPopup = () => {
    this.#removePopup();
    this.#addPopup();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleRemovePopup = () => {
    this.#removePopup();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleWatchListClick = () => {
    this.#film.filmInfo.userDetails.watchList = !this.#film.filmInfo.userDetails.watchList;
    this.#changeData(this.#film);
  };

  #handleAlreadyWatchedClick = () => {
    this.#film.filmInfo.userDetails.alreadyWatched = !this.#film.filmInfo.userDetails.alreadyWatched;
    this.#changeData(this.#film);
  };

  #handleFavoriteClick = () => {
    this.#film.filmInfo.userDetails.favorite = !this.#film.filmInfo.userDetails.favorite;
    this.#changeData(this.#film);
  };

  #handleEmojiChange = () => {
    this.#changeData(this.#film);
  };
}
