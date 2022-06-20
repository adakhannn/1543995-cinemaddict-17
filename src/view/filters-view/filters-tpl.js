const createFilterItemTemplate = (filterType, currentFilterType) => {
  const {name, count} = filterType;
  const getFilmsCount = () => name === 'All movies' ? '' : `<span class="main-navigation__item-count">${count}</span>`;
  return (
    `<a href="#${name}" class="main-navigation__item ${name === currentFilterType ? 'main-navigation__item--active' : ''}" data-filter-type="${name}">${name} ${getFilmsCount()}</a>`
  );
};

export const filtersTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">${filterItemsTemplate}</nav>`;
};
