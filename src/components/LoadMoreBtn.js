import { useDispatch, useSelector } from "react-redux";
import Preloader from "./Preloader";
import { fetchLoadMoreItems } from "../store/fetchCatalog";

export default function LoadMoreBtn() {
  const dispatch = useDispatch();
  const { hidden, disabled, loadingMore } = useSelector(
    (state) => state.catalog
  );
  const { category } = useSelector((state) => state.categories);
  const { searchInput } = useSelector((state) => state.searchField);

  const onLoadMoreHandler = () => {
    dispatch(fetchLoadMoreItems(category, searchInput));
  };

  return (
    <div>
      {loadingMore && <Preloader />}
      <div className="text-center">
        <button
          className="btn btn-outline-primary"
          style={hidden ? { visibility: "hidden" } : { visibility: "visible" }}
          onClick={onLoadMoreHandler}
          disabled={disabled}
        >
          Загрузить ещё
        </button>
      </div>
    </div>
  );
}
