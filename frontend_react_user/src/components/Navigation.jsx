// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <Link to="/">홈</Link> <br></br>
    <Link to="/cart">장바구니</Link>
  </nav>
);

export default Navigation;
