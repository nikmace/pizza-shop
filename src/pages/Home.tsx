import React from 'react';
import Skeleton from 'components/PizzaBlock/Skeleton';

import {
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAt,
} from 'firebase/firestore';
import { Sort, Categories, PizzaBlock, Pagination } from '../components';

import { pizzasCollection } from '../firebase/firebase';

import { IPizza } from '../types/types';

const sortItems = ['rating', 'price', 'name'];

const Home: React.FC = () => {
  const [pizzas, setPizzas] = React.useState<IPizza[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [categoryId, setCategoryId] = React.useState<number>(0);
  const [sort, setSort] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    const getAllPizzas = async () => {
      setLoading(true);

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

      if (categoryId === 0) {
        q = query(
          pizzasCollection,
          orderBy(sortName, 'asc'),
          limit(8),
          startAt(itemsStartIdx)
        );
      }

      const pizzaDocs = await getDocs(q);

      console.log(`CategoryID: ${categoryId}\n Sort: ${sort}\n Current Page: ${currentPage}`);

      pizzaDocs.docs.forEach((pizzaDoc) => {
        const pizzaData = pizzaDoc.data();
        pizzasList.push(pizzaData);
      });

      setPizzas(pizzasList);
      setLoading(false);
    };
    getAllPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sort, currentPage]);

  const skeletons = [...Array<number>(8)].map(() => <Skeleton />);
  // TODO: Implement filtration from searchValue
  const filteredPizzas = pizzas.map((pizza: IPizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(idx: number) => setCategoryId(idx)}
        />
        <Sort sort={sort} onClickSort={(idx: number) => setSort(idx)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading ? skeletons : filteredPizzas}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number: number) => setCurrentPage(number)}
      />
    </>
  );
};

export default Home;
