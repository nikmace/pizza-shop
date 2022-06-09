import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectSort,
  selectCategory,
  selectPage,
  selectPizza,
} from 'redux/filter/selectors';
import { selectPizzas, selectStatus } from 'redux/pizza/selectors';
import { setPizzas, setStatus } from 'redux/pizza/slice';
import { Status } from 'redux/pizza/types';
// import { selectError } from 'redux/error/selectors';
import getPizzasFromServer from '../server/getPizzasFromServer';

import {
  Sort,
  Categories,
  PizzaBlock,
  Pagination,
  Skeleton,
} from '../components';

import { IPizza } from '../types/types';

const sortItems = ['rating', 'price', 'name'];

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector(selectCategory);
  const sort = useSelector(selectSort);
  const currentPage = useSelector(selectPage);
  const searchName = useSelector(selectPizza);
  const pizzas: IPizza[] = useSelector(selectPizzas);
  const status: Status = useSelector(selectStatus);
  // const errorMsg = useSelector(selectError);

  React.useEffect(() => {
    const getAllPizzas = async () => {
      dispatch(setStatus(Status.LOADING));

      // Sort name is used to query pizzas collection
      const sortName: string = sortItems[sort];

      // When using server and not backendless
      const pizzasFromServer = await getPizzasFromServer(
        categoryId,
        sortName,
        currentPage,
        dispatch
      );

      dispatch(setPizzas(pizzasFromServer));
      dispatch(setStatus(Status.SUCCESS));
    };
    getAllPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sort, currentPage, dispatch]);

  const skeletons = [...Array<number>(8)].map((v) => <Skeleton key={v} />);

  const filteredPizzas = pizzas
    .filter((pizza: IPizza) =>
      pizza.name.toLowerCase().includes(searchName.toLowerCase())
    )
    .map((pizza: IPizza) => <PizzaBlock key={pizza._id} {...pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} />
        <Sort sort={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === Status.LOADING ? skeletons : filteredPizzas}
      </div>
      <Pagination currentPage={currentPage} />
    </div>
  );
};

export default Home;
