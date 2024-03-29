import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import CartIcon from "../../components/cart-icon/card-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
// import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart-context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import "./navigation.styles.scss";
import mainLogo from '../../assets/estore-logo.png';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

 

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img className="logo" src={mainLogo} alt="EStore Logo"></img>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon></CartIcon>
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet></Outlet>
    </Fragment>
  );
};

export default Navigation;
