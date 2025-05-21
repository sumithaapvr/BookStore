const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search by title or author"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;
