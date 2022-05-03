import BoardView from '../view/board-view/board-view';
import ListView from '../view/list-view/list-view';
import ListTitleView from '../view/list-title-view/list-title-view';
import CardView from '../view/card-view/card-view';
import MoreButtonView from '../view/more-button-view/more-button-view';
import {render, RenderPosition} from '../render';

export default class BoardPresenter {
  boardComponent = new BoardView();
  listComponent = new ListView();
  listTitleComponent = new ListTitleView();
  moreButtonComponent = new MoreButtonView();

  init (boardContainer, FilmModel) {
    this.boardContainer = boardContainer;
    this.filmModel = FilmModel;
    this.boardFilms = [...this.filmModel.getFilms()];

    render(this.boardComponent, this.boardContainer);
    render(this.listComponent, this.boardComponent.getElement());
    render(this.listTitleComponent, this.listComponent.getElement(), RenderPosition.AFTERBEGIN);
    for (let i = 0; i < this.boardFilms.length; i++) {
      render(new CardView(this.boardFilms[i]), this.listComponent.getElement().querySelector('.films-list__container'));
    }
    render(this.moreButtonComponent, this.boardComponent.getElement().querySelector('.films-list'));
  }
}
