import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNotification } from 'web3uikit';

import 'react-toastify/dist/ReactToastify.css';

import getCartFromLS from 'utils/getCartFromLS';
import {
  BottomButtons,
  CheckoutHeading,
  CheckoutInfo,
  Loader,
} from '../components';

import validateInput, { ValidationResponse } from '../server/validateInput';
import sendOrder from '../server/sendOrder';

import { removeAllItemsFromCart } from '../redux/cart/slice';

import { CartItem, OrderCartData } from '../types/types';

export type InputValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  time: string;
};

type ValidateInputRes = ValidationResponse | undefined;

const initialInputValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  time: '',
};

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const sendNotification = useNotification();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [validationRes, setValidationRes] = React.useState<ValidateInputRes>();
  const [inputValues, setInputValues] =
    React.useState<InputValues>(initialInputValues);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = async (): Promise<ValidateInputRes> => {
    const res = await validateInput(inputValues, dispatch);

    setValidationRes(res);
    return res;
  };

  const getOrderFromCartItems = (cartItems: CartItem[]): OrderCartData[] => {
    const itemArr: OrderCartData[] = [];

    cartItems.forEach((item) => {
      itemArr.push({
        name: item.name,
        variationId: item.variation.id,
        count: item.variation.count,
        price: item.price + item.variation.variationPrice,
        size: item.variation.size,
        type: item.variation.type,
      });
    });

    return itemArr;
  };

  const resetOrderForm = () => {
    // Show loading screen
    setInputValues(initialInputValues);
    setIsLoading(true);
  };

  const submitOrder = async () => {
    const valRes = await validate();

    const { cartItems, totalPrice } = getCartFromLS();
    const arrayOfItems = getOrderFromCartItems(cartItems);

    if (valRes?.success) {
      // If validation is successful
      const order = {
        ...inputValues,
        orderTimeSent: new Date().toLocaleString(),
        order: arrayOfItems,
        totalPrice,
      };

      // Save to backend
      if (order.order.length !== 0) {
        const res = await sendOrder(order, dispatch);

        if (res?.success) {
          // Reset Order form
          resetOrderForm();

          // Notify user
          sendNotification({
            type: 'success',
            message: res?.message || '',
            title: 'Успешная операция',
            icon: 'cart',
            position: 'topR',
          });
        } else {
          sendNotification({
            type: 'error',
            message: res?.message || '',
            title: 'Ошибка',
            icon: 'exclamation',
            position: 'topR',
          });
        }
      } else {
        // Tell user cannot send order with empty cart
        sendNotification({
          type: 'warning',
          message: 'Корзина не может быть пустой!',
          title: 'Добавьте пиццу в корзину',
          icon: 'cart',
          position: 'topR',
        });
      }
    }
  };

  // We set loading when we submit order, then redirect to home page
  if (isLoading) {
    setTimeout(() => {
      dispatch(removeAllItemsFromCart());
      // window.location.replace('/');
      setIsLoading(false);
    }, 1000);

    return <Loader />;
  }

  return (
    <form className="container container--cart">
      <CheckoutHeading title="Checkout" />

      <div className="checkout">
        <div className="checkout__item">
          <label htmlFor="firstName">
            Ваше имя
            <input
              className="checkout__item-input"
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Ваше имя"
              value={inputValues.firstName}
              onChange={handleInputChange}
            />
            {validationRes?.errors.firstName.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </label>
        </div>
        <div className="checkout__item">
          <label htmlFor="lastName">
            Ваша фамилия
            <input
              className="checkout__item-input"
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Ваша фамилия"
              value={inputValues.lastName}
              onChange={handleInputChange}
            />
            {validationRes?.errors.lastName.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </label>
        </div>
        <div className="checkout__item">
          <label htmlFor="phone">
            Номер телефона
            <input
              className="checkout__item-input"
              id="phone"
              type="tel"
              name="phone"
              placeholder="+7 (...) .."
              value={inputValues.phone}
              onChange={handleInputChange}
            />
            {validationRes?.errors.phone.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </label>
        </div>
        <div className="checkout__item">
          <label htmlFor="email">
            Имейл
            <input
              className="checkout__item-input"
              id="email"
              type="email"
              name="email"
              placeholder="..@mail.ru | ..@gmail.com"
              value={inputValues.email}
              onChange={handleInputChange}
            />
            {validationRes?.errors.email.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </label>
        </div>
        <div className="checkout__item">
          <label htmlFor="address">
            Адресс
            <input
              className="checkout__item-input"
              id="address"
              type="text"
              name="address"
              placeholder="Город, улица, дом, подъезд, квартира.."
              value={inputValues.address}
              onChange={handleInputChange}
            />
            {validationRes?.errors.address.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </label>
        </div>
        <div className="checkout__item">
          <label htmlFor="time">
            Выберите время доставки
            <input
              className="checkout__item-input"
              id="time"
              name="time"
              type="datetime-local"
              value={inputValues.time}
              onChange={handleInputChange}
            />
            {validationRes?.errors.time.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </label>
        </div>
      </div>

      <CheckoutInfo />

      <BottomButtons submitOrder={submitOrder} />
    </form>
  );
};

export default Checkout;
