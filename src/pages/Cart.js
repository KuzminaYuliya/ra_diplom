import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFromCart } from "../store/cartReducer";
import Order from '../components/Order';

export default function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cartState);
  const { success } = useSelector((state) => state.orderState);

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.length !== 0 &&
              items.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <Link to={`/catalog/${item.id}`}>{item.title}</Link>
                  </td>
                  <td>{item.size}</td>
                  <td>{item.amount}</td>
                  <td>{`${item.price} руб.`}</td>
                  <td>{`${item.price * item.amount} руб.`}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => dispatch(deleteFromCart(item.id))}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            <tr>
              <td colSpan="5" className="text-right">
                Общая стоимость
              </td>
              <td>
                {`${items.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.amount * currentValue.price,
                  0
                )} руб.`}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      {items.length !== 0 && <Order />}
      {success && (
        <div
          className="text-center"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            color: "green",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Заказ отправлен успешно!
        </div>
      )}
    </>
  );
}
