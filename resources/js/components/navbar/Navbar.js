import React from "react";
import {  Menu } from "antd";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import Logo from "../svg/Logo";

const Navbar = (props) => {
  return (
    <>
      <Menu mode="horizontal" className="navbar">
        <Menu.Item key="0" className="navbar-brand">
          <NavLink to="/" className="brand-link">
            <Logo />
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
};
export default Navbar;


