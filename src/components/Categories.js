import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, switchCategory } from "../store/fetchCategories";

export default function Categories() {
  const dispatch = useDispatch();
  const { categories, category } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onSwitchCategoryHandler = (e, id) => {
    e.preventDefault();
    dispatch(switchCategory(id));
  };

  return (
    <ul className="catalog-categories nav justify-content-center">
      {categories.map((ctg) => (
        <li key={ctg.id} className="nav-item">
          <a
            className={ctg.id === category ? "nav-link active" : "nav-link"}
            href="/"
            onClick={(e) => onSwitchCategoryHandler(e, ctg.id)}
          >
            {ctg.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
