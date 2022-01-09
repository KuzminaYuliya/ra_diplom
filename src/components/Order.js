import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrder,
  changeInputField,
  changeCheckbox,
} from "../store/fetchOrder";
import Preloader from "./Preloader";
import Error from "./Error";

export default function Order() {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cartState);
  const { owner, loading, error, checked } = useSelector(
    (state) => state.orderState
  );

  const onValidateFormHandler = () => {
    if (
      owner.phone.trim() !== "" &&
      Number(owner.phone) &&
      owner.address.trim() !== "" &&
      checked
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(fetchOrder(owner, items));
  };

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    dispatch(changeInputField({ name, value }));
  };

  const onCheckHandler = () => {
    dispatch(changeCheckbox(!checked));
  };

  if (loading) return <Preloader />;

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
        <form className="card-body" onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              placeholder="Ваш телефон"
              name="phone"
              value={owner.phone}
              onChange={onChangeInputHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              id="address"
              placeholder="Адрес доставки"
              name="address"
              value={owner.address}
              onChange={onChangeInputHandler}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              checked={checked}
              onChange={onCheckHandler}
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            disabled={onValidateFormHandler()}
          >
            Оформить
          </button>
        </form>
      </div>
      {error && <Error />}
    </section>
  );
}
