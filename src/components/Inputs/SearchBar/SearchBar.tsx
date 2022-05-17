import { FC, useContext } from 'react';

import SearchContext from '@context/SearchContext';

import SearchIcon from '@media/UI/search.svg';
import CloseIcon from '@media/UI/close.svg';

import classes from './SearchBar.module.scss';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
  const { search, updateSearch } = useContext(SearchContext);

  return (
    <div className="flex justify-center items-center w-80 h-10 py-2 px-4 bg-color-shade-dark-4-day effect-style-small-button-drop-shadow rounded">
      <SearchIcon className="inline-block mr-1" />

      <input
        type="text"
        id="search"
        name="search"
        placeholder="Image Search"
        className={classes.searchBar}
        value={search}
        onChange={(e) => updateSearch(e.target.value)}
      />

      <div className="cursor-pointer" onClick={() => updateSearch('')}>
        <CloseIcon className="inline-block mr-1" />
      </div>
    </div>
  );
};

export default SearchBar;
