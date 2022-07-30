import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCartItemsCount, selectTotalPrice } from 'redux/cart/selectors';

import logoSvg from '../assets/img/pizza-logo.svg';
import Search from './Search';

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
          {pathname === '/' && (
            <Link
              to="/previous-orders"
              className="header__previous button--outline button"
            >
              <svg viewBox="0 0 512 512" width="20" height="20" fill="#fe5f1e">
                <path d="M251.2305,448H70.7735a150.4432,150.4432,0,0,0,32.2656-93.5391V64H381.4336V217.1719a8,8,0,0,0,16,0V56a7.9979,7.9979,0,0,0-8-8H95.0391a7.9979,7.9979,0,0,0-8,8V354.4609a134.7126,134.7126,0,0,1-39.711,95.8829A7.9993,7.9993,0,0,0,52.9844,464H251.2305a8,8,0,0,0,0-16Z" />
                <path d="M333.9961,148.7656h-183.52a8,8,0,0,0,0,16h183.52a8,8,0,0,0,0-16Z" />
                <path d="M341.9961,210.9688a7.9979,7.9979,0,0,0-8-8h-183.52a8,8,0,1,0,0,16h183.52A7.9979,7.9979,0,0,0,341.9961,210.9688Z" />
                <path d="M262.2305,265.1719a7.9979,7.9979,0,0,0-8-8H150.4766a8,8,0,0,0,0,16H254.2305A7.9979,7.9979,0,0,0,262.2305,265.1719Z" />
                <path d="M150.4766,311.375a8,8,0,1,0,0,16h65.2539a8,8,0,0,0,0-16Z" />
                <path d="M436.7266,287.4609A103.32,103.32,0,0,0,261.7905,342.873l-6.3569-6.3574a7.9991,7.9991,0,0,0-11.3125,11.3125L262.53,366.2363a8.026,8.026,0,0,0,11.3232,0l18.4126-18.4082a7.9991,7.9991,0,0,0-11.3125-11.3125l-1.8169,1.8164a87.3378,87.3378,0,1,1,22.6568,84.0664,7.9991,7.9991,0,0,0-11.3125,11.3125,103.413,103.413,0,0,0,146.2461-146.25Z" />
                <path d="M363.6055,291.32a7.9979,7.9979,0,0,0-8,8v61.2656a8.115,8.115,0,0,0,2.3506,5.6641l28.9931,28.9922A7.9991,7.9991,0,0,0,398.2617,383.93l-26.6562-26.6563V299.32A7.9979,7.9979,0,0,0,363.6055,291.32Z" />
              </svg>
            </Link>
          )}
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter" />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{cartItemsCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
