import { NavLink } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import HeaderWidget from "./HeaderWidget";

export default function Header() {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <HeaderLogo />
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Главная
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/catalog"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Каталог
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/about"
                    className="nav-link"
                    activeClassName="active"
                  >
                    О магазине
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/contacts"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Контакты
                  </NavLink>
                </li>
              </ul>
              <div>
                <HeaderWidget />
                <HeaderSearch />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
