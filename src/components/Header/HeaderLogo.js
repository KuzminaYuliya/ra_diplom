import { Link } from "react-router-dom";
import logo from "../../img/header-logo.png";

export default function HeaderLogo() {
  return (
    <Link to="/" className="navbar-brand">
      <img src={logo} alt="Bosa-Noga"></img>
    </Link>
  );
}
