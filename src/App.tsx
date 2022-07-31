import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { seti18n } from './redux/i18n/slice';
import { getCurrentIP } from './i18n';

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
const SinglePizza = React.lazy(
  () => import(/* webpackChunkName: "SinglePizza" */ './pages/SinglePizza')
);
const PreviousOrders = React.lazy(
  () =>
    import(/* webpackChunkName: "PreviousOrders" */ './pages/PreviousOrders')
);

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getIP() {
      const data = await getCurrentIP();
      dispatch(
        seti18n({
          ip: data.ip,
          country: data.country,
        })
      );
    }

    getIP();
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          duration: 4000,
          success: {
            style: {
              padding: '8px',
            },
          },
        }}
      />
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
            path="/previous-orders"
            element={
              <Suspense fallback={<Loader />}>
                <PreviousOrders />
              </Suspense>
            }
          />
          <Route
            path="/pizza/:id"
            element={
              <Suspense fallback={<Loader />}>
                <SinglePizza />
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
