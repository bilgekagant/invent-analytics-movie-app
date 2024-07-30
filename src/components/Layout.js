// src/components/Layout.js
import React from 'react';
import { Container } from 'reactstrap';
import Header from './Header';
import '../styles/Layout.css'
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container className="mt-4">
        {children}
      </Container>
    </>
  );
};

export default Layout;
