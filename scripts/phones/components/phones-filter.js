'use strict'

import Component from '../../component.js';

export const SORT_NONE = 'sort-none';
export const SORT_BY_NAME = 'sort-by-name';
export const SORT_BY_AGE_ASC = 'sort-by-age-asc';
export const SORT_BY_AGE_DESC = 'sort-by-age-desc';

export default class PhonesFilter extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this.on('input', '[data-element="input-filter-text"]', (event) => {
      let text = event.target.value;
      this._trigger('filterTextChanged', text);
    });

    this.on('change', '[data-element="combo-sort-type"]', (event) => {
      let option = event.target.children[event.target.selectedIndex];
      if(option){
        this._trigger('sortTypeChanged', option.dataset.element);
      }
    });

  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input
          data-element="input-filter-text"
        >
      </p>

      <p>
        Sort by:
        <select
          data-element="combo-sort-type"
        >
        <option value="name"
            data-element='${ SORT_NONE }'
          >
            No sort
          </option>
          <option value="name"
            data-element='${ SORT_BY_NAME }'
          >
            Alphabetical
          </option>
          <option value="age"
            data-element='${ SORT_BY_AGE_ASC }'
          >
            Newest
          </option>
          <option value="age"
            data-element='${ SORT_BY_AGE_DESC }'
          >
            Oldest
          </option>
        </select>
      </p>
    `;
  }
}
