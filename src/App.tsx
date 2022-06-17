import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Loader } from './components';
import { Home } from './pages';

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ './pages/Cart')
);
const Checkout = React.lazy(
  () => import(/* webpackChunkName: "Checkout" */ './pages/Checkout')
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
);

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<Loader />}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<Loader />}>
                <Checkout />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
