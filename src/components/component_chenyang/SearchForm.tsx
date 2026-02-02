interface SearchFormProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  }
  
  function SearchForm({ searchTerm, setSearchTerm }: SearchFormProps) {
    return (
      <div>
        <label htmlFor="search">Search Employee: </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type a name to filter..."
        />
      </div>
    );
  }
  
  export default SearchForm;