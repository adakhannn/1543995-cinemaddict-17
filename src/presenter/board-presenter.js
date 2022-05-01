import BoardView from '../view/board-view/board-view.js';
import ListView from '../view/list-view/list-view.js';
import ListTitleView from '../view/list-title-view/list-title-view.js';
import CardView from '../view/card-view/card-view.js';
import MoreButtonView from '../view/more-button-view/more-button-view';
import {render, RenderPosition} from '../render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();
  listComponent = new ListView();
  listTitleComponent = new ListTitleView();
  moreButtonComponent = new MoreButtonView();

  init (boardContainer) {
    this.boardContainer = boardContainer;

    render(this.boardComponent, this.boardContainer);
    render(this.listComponent, this.boardComponent.getElement());
    render(this.listTitleComponent, this.listComponent.getElement(), RenderPosition.AFTERBEGIN);
    for (let i = 0; i < 5; i++) {
      render(new CardView(), this.listComponent.getElement().querySelector('.films-list__container'));
    }
    render(this.moreButtonComponent, this.boardComponent.getElement().querySelector('.films-list'));
  };
}
