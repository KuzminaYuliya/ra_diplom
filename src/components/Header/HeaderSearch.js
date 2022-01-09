import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchField } from "../../store/fetchSearch";

export default function HeaderSearch() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { searchInput, hidden } = useSelector((state) => state.searchField);

  const onChangeHandler = (e) => {
    dispatch(changeSearchField(e.target.value));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (searchInput !== "") {
      history.push("/catalog");
    }    
  };

  return (
    <form
      data-id="search-form"
      className={`header-controls-search-form form-inline ${
        hidden && "invisible"
      }`}
      onSubmit={onSubmitHandler}
    >
      <input
        name="searchInput"
        value={searchInput}
        onChange={onChangeHandler}
        className="form-control"
        placeholder="Поиск"
      />
    </form>
  );
}
