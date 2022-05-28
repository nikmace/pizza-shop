import React from 'react';
import {
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAt,
} from 'firebase/firestore';
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

import {
  Sort,
  Categories,
  PizzaBlock,
  Pagination,
  Skeleton,
} from '../components';

import { pizzasCollection } from '../firebase/firebase';

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

  React.useEffect(() => {
    const getAllPizzas = async () => {
      dispatch(setStatus(Status.LOADING));

      // Sort name is used to query pizzas collection
      const sortName: string = sortItems[sort];
      const pizzasList: IPizza[] = [];
      // If current page is 1 we first load 8 items, if page is 2 we load the rest
      const itemsStartIdx: number = currentPage === 1 ? 0 : 8;

      let q = query(
        pizzasCollection,
        where('category', '==', categoryId),
        orderBy(sortName),
        limit(8),
        startAt(itemsStartIdx)
      );

      // If category is 0 that means we have to show all pizzas, so we change the query
      if (categoryId === 0) {
        q = query(
          pizzasCollection,
          orderBy(sortName, 'asc'),
          limit(8),
          startAt(itemsStartIdx)
        );
      }
      try {
        const pizzaDocs = await getDocs(q);

        pizzaDocs.docs.forEach((pizzaDoc) => {
          const pizzaData = {
            ...pizzaDoc.data(),
            id: pizzaDoc.id,
          };
          pizzasList.push(pizzaData);
        });
      } catch (error) {
        dispatch(setStatus(Status.ERROR));
      }

      // console.log(
      //   `CategoryID: ${categoryId}\n Sort: ${sort}\n Current Page: ${currentPage}`
      // );
      dispatch(setPizzas(pizzasList));
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
    .map((pizza: IPizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} />
        <Sort sort={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === Status.LOADING ? skeletons : filteredPizzas}
      </div>
      <Pagination currentPage={currentPage} />
    </>
  );
};

export default Home;
