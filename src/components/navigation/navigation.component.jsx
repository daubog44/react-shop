import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwonLogo } from "../../assets/crown.svg";
import { Fragment } from "react"; // Fragment non rappresenta niente, ma serve per fare un wrapper inutile al posto del div
import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <CrwonLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          <Link className="nav-link" to="/sign-in">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
