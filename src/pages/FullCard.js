import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  fetchFullCard,
  chooseSize,
  amountInc,
  amountDec,
} from "../store/fetchFullCard";
import { addToCart } from "../store/cartReducer";
import Preloader from "../components/Preloader";
import Error from "../components/Error";
import noImage from "../img/no-image-available.png";

export default function FullCard({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { item, loading, error, size, amount } = useSelector(
    (state) => state.fullCard
  );

  let availableSizes;
  if (item.sizes) {
    availableSizes = item.sizes
      .filter((size) => size.avalible)
      .map((item) => item.size);
  }

  useEffect(() => {
    dispatch(fetchFullCard(match.params.id));
  }, [dispatch, match.params.id]);

  const onError = (e) => {
    e.target.src = noImage;
  };
  if (loading) return <Preloader />;
  if (error) return <Error />;

  const sizeHandler = (data) => {
    if (size !== data) {
      dispatch(chooseSize(data));
    }
  };
  
  const incAmountHandler = () => {
    if (amount < 10) {
      dispatch(amountInc());
    }
  };
  
  const decAmountHandler = () => {
    if (amount > 1 && amount <= 10) {
      dispatch(amountDec());
    }
  };
  
  const addToCartHandler = () => {
    const itemObj = {
      id: item.id,
      title: item.title,
      size,
      amount,
      price: item.price,
    };
    dispatch(addToCart(itemObj));
    history.push("/cart");
  };

  return (
    <section className="catalog-item">
      <h2 className="text-center">{item.title}</h2>
      <div className="row">
        <div className="col-5">
          <img
            src={item.images && item.images[0]}
            className="img-fluid"
            alt={item.title}
            onError={onError}
          />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{item.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{item.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{item.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{item.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{item.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{item.reason}</td>
              </tr>
            </tbody>
          </table>
          {availableSizes && (
            <div className="text-center">
              <p>
                Размеры в наличии:
                {availableSizes.map((data) => (
                  <span
                    key={item.id}
                    style={{ cursor: "pointer" }}
                    className={`catalog-item-size ${
                      size === data && "selected"
                    }`}
                    onClick={() => sizeHandler(data)}
                  >
                    {data}
                  </span>
                ))}
              </p>
              <p>
                Количество:{" "}
                <span className="btn-group btn-group-sm pl-2">
                  <button
                    className="btn btn-secondary"
                    onClick={decAmountHandler}
                  >
                    -
                  </button>
                  <span className="btn btn-outline-primary">{amount}</span>
                  <button
                    className="btn btn-secondary"
                    onClick={incAmountHandler}
                  >
                    +
                  </button>
                </span>
              </p>
            </div>
          )}
          {size !== "" && (
            <button
              className="btn btn-danger btn-block btn-lg"
              onClick={addToCartHandler}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
