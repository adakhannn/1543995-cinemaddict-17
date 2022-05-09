import {FILM_COUNT_PER_STEP} from '../const';
import {render, RenderPosition} from '../render';
import {isEscapeKey} from '../utils';
import BoardView from '../view/board-view/board-view';
import ListView from '../view/list-view/list-view';
import ListTitleView from '../view/list-title-view/list-title-view';
import CardView from '../view/card-view/card-view';
import MoreButtonView from '../view/more-button-view/more-button-view';
import PopupView from '../view/popup-view/popup-view';
import SortView from '../view/filters-view/sort-view';
import CardEmptyView from '../view/card-empty-view/card-empty-view';
import ContainerView from '../view/container-view/container-view';

export default class BoardPresenter {
  #boardContainer = null;
  #filmModel = null;
  #boardFilms = null;

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #boardComponent = new BoardView();
  #sortComponent = new SortView();
  #listComponent = new ListView();
  #containerComponent = new ContainerView();
  #listTitleComponent = new ListTitleView();
  #moreButtonComponent = new MoreButtonView();
  #cardEmptyComponent = new CardEmptyView();

  constructor(boardContainer, filmModel) {
    this.#boardContainer = boardContainer;
    this.#filmModel = filmModel;
  }

  init () {
    this.#boardFilms = [...this.#filmModel.films];
    this.#renderBoard();
  }

  #handleMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#boardFilms
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#boardFilms.length) {
      this.#moreButtonComponent.element.remove();
      this.#moreButtonComponent.removeElement();
    }
  };

  #renderFilm = (film) => {
    const cardComponent = new CardView(film);
    const popupComponent = new PopupView(film);

    const addPopup = () => {
      render(popupComponent, this.#boardContainer);
      this.#boardContainer.parentElement.classList.add('hide-overflow');
    };

    const removePopup = () => {
      const allPopup = this.#boardContainer.querySelectorAll('.film-details');
      allPopup.forEach((item) => {
        this.#boardContainer.removeChild(item);
      });
      this.#boardContainer.parentElement.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        removePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    cardComponent.element.querySelector('.film-card__link').addEventListener('click', (evt) => {
      evt.preventDefault();
      removePopup();
      addPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      removePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(cardComponent, this.#listComponent.element.querySelector('.films-list__container'));
  };

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);
    render(this.#listComponent, this.#boardComponent.element);
    if (this.#boardFilms.length === 0) {
      render(this.#cardEmptyComponent, this.#listComponent.element);
      return;
    }
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
    render(this.#listTitleComponent, this.#listComponent.element);
    render(this.#containerComponent, this.#listComponent.element);
    for (let i = 0; i < Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#boardFilms[i]);
    }
    if (this.#boardFilms.length > FILM_COUNT_PER_STEP) {
      render(this.#moreButtonComponent, this.#boardComponent.element.querySelector('.films-list'));
      this.#moreButtonComponent.element.addEventListener('click', this.#handleMoreButtonClick);
    }
  };
}
