import BoardView from '../view/board-view/board-view';
import ListView from '../view/list-view/list-view';
import ListTitleView from '../view/list-title-view/list-title-view';
import CardView from '../view/card-view/card-view';
import MoreButtonView from '../view/more-button-view/more-button-view';
import {render, RenderPosition} from '../render';
import PopupView from '../view/popup-view/popup-view';
import {isEscapeKey} from '../utils';

export default class BoardPresenter {
  #boardContainer = null;
  #filmModel = null;
  #boardFilms = null;

  #boardComponent = new BoardView();
  #listComponent = new ListView();
  #listTitleComponent = new ListTitleView();
  #moreButtonComponent = new MoreButtonView();

  init (boardContainer, FilmModel) {
    this.#boardContainer = boardContainer;
    this.#filmModel = FilmModel;
    this.#boardFilms = [...this.#filmModel.films];

    render(this.#boardComponent, this.#boardContainer);
    render(this.#listComponent, this.#boardComponent.element);
    render(this.#listTitleComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
    this.#boardFilms.forEach((item) => {
      this.#renderFilm(item);
    });
    render(this.#moreButtonComponent, this.#boardComponent.element.querySelector('.films-list'));
  }

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
}
