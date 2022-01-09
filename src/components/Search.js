import { useDispatch, useSelector } from "react-redux";
import { changeSearchField } from "../store/fetchSearch";

function Search() {
  const { searchInput } = useSelector((state) => state.searchField);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    dispatch(changeSearchField(e.target.value));
  };

  return (
    <form className="catalog-search-form form-inline">
      <input
        value={searchInput}
        name="search"
        onChange={onChangeHandler}
        className="form-control"
        placeholder="Поиск"
      />
    </form>
  );
}

export default Search;
