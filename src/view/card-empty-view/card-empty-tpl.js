import {NO_FILMS_TEXTS} from '../../consts';

export const cardEmptyTemplate = (filterType) => {
  const noFilmsTextValue = NO_FILMS_TEXTS[filterType];

  return (
    `<h2 class="films-list__title">
      ${noFilmsTextValue}
    </h2>`);
};
