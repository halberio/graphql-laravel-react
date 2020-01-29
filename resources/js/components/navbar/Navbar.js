import React from "react";
import "./navbar.scss";
import Logo from "../svg/Logo";
import {useSelector} from "react-redux";

const Navbar = () => {
    const user = useSelector(state => state.authReducer.user);
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  return (
      <div className="navbar">
          <Logo />
          {isLoggedIn && user ? <p>Hello {user.name}</p> : null}
      </div>
  );
};
export default Navbar;


