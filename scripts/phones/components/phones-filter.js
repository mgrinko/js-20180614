import Component from '../../component.js';

export default class PhonesFilter extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this._searchQuery = '';
    this._sortBy = 'name';

    this.on('input', '[data-element="search-query"]', (event) => {
      this._onSearchQueryChange()(event.delegateTarget.value);
    });

    this.on('change', '[data-element="sort-selector"]', (event) => {
      this._sortBy = event.delegateTarget.value;
      this._onFilterChange();
    });
  }

  init() {
    this._onFilterChange();
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input data-element="search-query">
      </p>

      <p>
        Sort by:
        <select data-element="sort-selector">
          <option value="name" selected>Alphabetical (a - z)</option>
          <option value="-name">Alphabetical (z - a)</option>
          <option value="age">Age (newest first)</option>
          <option value="-age">Age (oldest first)</option>
        </select>
      </p>
    `;
  }

  _onSearchQueryChange() {
    if (! this.debouncedFilterChange) {
      this.debouncedFilterChange = this._debounce((query) => {
        this._searchQuery = query;
        this._onFilterChange();
      }, 500);
    }

    return this.debouncedFilterChange;
  }

  _onFilterChange() {
    this._trigger('filterchange', {
      searchQuery: this._searchQuery,
      sortBy: this._sortBy,
    });
  }
}
