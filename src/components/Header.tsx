import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCartItemsCount, selectTotalPrice } from 'redux/cart/selectors';

import logoSvg from '../assets/img/pizza-logo.svg';
import { Search, PreviousOrders } from '.';
import { CartSVG } from './svg';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const totalPrice = useSelector(selectTotalPrice);
  const cartItemsCount = useSelector(selectCartItemsCount);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>ДОДО ПИЦЦА</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>

        {pathname === '/' && <Search />}

        <div className="header__cart">
          {pathname === '/' && <PreviousOrders />}
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter" />
            <CartSVG />
            <span>{cartItemsCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
