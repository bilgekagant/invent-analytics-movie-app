// src/components/Header.js
import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Ensure you create this CSS file

const Header = () => {
  return (
    <Navbar color="primary" dark expand="md" className="custom-navbar">
      <NavbarBrand tag={Link} to="/" className="mx-auto">
        Movie Explorer
      </NavbarBrand>
    </Navbar>
  );
};

export default Header;
