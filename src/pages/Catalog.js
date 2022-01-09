import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalog } from "../store/fetchCatalog";
import Preloader from "../components/Preloader";
import Error from "../components/Error";
import Categories from "../components/Categories";
import Card from "../components/Card";
import LoadMoreBtn from "../components/LoadMoreBtn";

export default function Catalog({ children }) {
  const dispatch = useDispatch();
  const { searchInput } = useSelector((state) => state.searchField);
  const { items, loading, error } = useSelector((state) => state.catalog);
  const { category } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCatalog(category, searchInput));
  }, [dispatch, category, searchInput]);

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {children ? children : null}
      {loading ? <Preloader /> : <Categories />}
      {error && <Error />}
      {!loading && !error && (
        <>
          <div className="row">
            {items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
          {items.length === 0 && (
            <div className="text-center">
              По вашему запросу ничего не найдено.
              Ошибка соединения.
            </div>
          )}
        </>
      )}
       {items.length !== 0 && <LoadMoreBtn />}      
    </section>
  );
}
