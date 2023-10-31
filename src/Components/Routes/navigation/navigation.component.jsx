import { Fragment, useContext } from "react"; //component che renderà niente
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as LeafLogo } from "../../../assets/img/leaf-logo.svg";
import "./navigation.styles.scss";
import CartIcon from "../../Cart-icon/CartIcon.component";
import CartDropDown from "../../Cart-DropDown/CartDropDown.component";

import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <LeafLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )} 
          <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />} 
      </div>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
