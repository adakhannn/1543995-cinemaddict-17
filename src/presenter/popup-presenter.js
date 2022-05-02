import PopupView from '../view/popup-view/popup-view';
import {render} from '../render';

export default class PopupPresenter {
  init (popupContainer, PopupModel) {
    this.popupContainer = popupContainer;
    this.popupModel = PopupModel;
    this.popupFilm = [...this.popupModel.getFilms()];

    render(new PopupView(this.popupFilm[0]), this.popupContainer);
  }
}
