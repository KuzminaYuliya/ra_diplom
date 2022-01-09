import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchFieldVisibility } from "../../store/fetchSearch";

export default function HeaderWidget() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { searchInput, hidden } = useSelector((state) => state.searchField);
  const { items } = useSelector((state) => state.cartState);

  const onHideHandler = () => {
    if (hidden) {
      dispatch(changeSearchFieldVisibility(!hidden));
    }

    if (hidden === false && searchInput.trim() === "") {
      dispatch(changeSearchFieldVisibility(!hidden));
    }
  };

  return (
    <div className="header-controls-pics">
      <div
        data-id="search-expander"
        className="header-controls-pic header-controls-search"
        onClick={onHideHandler}
      ></div>
      <div
        className="header-controls-pic header-controls-cart"
        onClick={() => history.push("/cart")}
      >
        {items.length !== 0 && (
          <div className="header-controls-cart-full">{items.length}</div>
        )}
        <div className="header-controls-cart-menu"></div>
      </div>
    </div>
  );
}
