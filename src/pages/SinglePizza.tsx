import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectLocale } from '../redux/i18n/selectors';

import { Loader, PizzaNotFound } from '../components';

import { IPizza } from '../types/types';

import getPizzaById from '../server/getPizzaById';

import starSVG from '../assets/img/heart.svg';

const types = ['тонкое', 'традиционное'];
const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const SinglePizza: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const { id } = useParams<string>();

  const [pizza, setPizza] = React.useState<IPizza>();
  const [loading, setLoading] = React.useState(false);

  // For some reason this causes the component to render 3 times
  const i18n = useSelector(selectLocale);

  const {
    currencySign,
    SinglePizza: {
      PIZZA_CATEGORY,
      PIZZA_DOUGH_TYPE,
      PIZZA_FROM,
      PIZZA_PRICE,
      PIZZA_RATING,
      PIZZA_SIZES,
      BACK_BUTTON,
    },
  } = i18n;

  React.useEffect(() => {
    const getPizza = async () => {
      setLoading(true);

      const item = await getPizzaById(
        typeof id === 'string' ? id : '',
        dispatch
      );

      setPizza(item);
      setLoading(false);
    };

    getPizza();
  }, [id, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      {pizza?._id ? (
        <>
          <div className="content__top">
            <h2 className="content__title">{pizza?.name}</h2>
          </div>
          <div className="pizza">
            <img
              className="pizza__image"
              src={pizza?.imageUrl}
              alt={pizza?.name}
            />
            <div className="pizza__info">
              <div className="pizza__info-item">
                <h3>{PIZZA_PRICE}:</h3>
                <span>
                  {PIZZA_FROM} {pizza?.price} {currencySign}
                </span>
              </div>
              <div className="pizza__info-item">
                <h3>{PIZZA_RATING}:</h3>
                <span>
                  {pizza?.rating} <img src={starSVG} alt="Star" />
                </span>
              </div>
              <div className="pizza__info-item">
                <h3>{PIZZA_SIZES}:</h3>
                <span>{pizza?.sizes.map((v) => `${v.toString()} см. `)}</span>
              </div>
              <div className="pizza__info-item">
                <h3>{PIZZA_DOUGH_TYPE}</h3>
                <span>
                  {pizza?.types.map((v, idx, arr) => {
                    if (arr.length - 1 === idx) {
                      return `${types[v]}`;
                    }
                    return `${types[v]}, `;
                  })}
                </span>
              </div>
              <div className="pizza__info-item">
                <h3>{PIZZA_CATEGORY}:</h3>
                <span>{categories[pizza ? pizza?.category : 0]}</span>
              </div>
              <Link to="/">
                <div className="button pay-btn pizza-btn">
                  <span>{BACK_BUTTON}</span>
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <PizzaNotFound />
      )}
    </div>
  );
});

export default SinglePizza;
