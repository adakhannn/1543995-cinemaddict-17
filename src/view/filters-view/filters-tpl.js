const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item ${isChecked ? 'main-navigation__item--active' : ''}">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

export const filtersTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<nav class="main-navigation">${filterItemsTemplate}</nav>`;
};
