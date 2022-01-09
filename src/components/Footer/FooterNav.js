import { Link } from "react-router-dom";

export default function FooterNav() {
  return (
    <div className="col">
      <section>
        <h5>Информация</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              О магазине
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/catalog" className="nav-link">
              Каталог
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contacts" className="nav-link">
              Контакты
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
