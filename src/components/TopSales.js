import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopSales } from "../store/fetchTopSales";

import Card from "./Card";
import Preloader from "./Preloader";
import Error from "./Error";

export default function TopSales() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.topSales);

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);

  if (items.length === 0 && !loading) return null;

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        {loading && <Preloader />}
        {error && <Error />}
        {items.length !== 0 &&
          items.map((item) => <Card key={item.id} item={item} />)}
      </div>
    </section>
  );
}
