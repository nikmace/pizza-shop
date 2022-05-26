import React from 'react';
import Skeleton from 'components/PizzaBlock/Skeleton';

import { getDocs, query, where, orderBy } from 'firebase/firestore';
import { Sort, Categories, PizzaBlock } from '../components';

import { pizzasCollection } from '../firebase/firebase';

import { IPizza } from '../types/types';

const sortItems = ['price', 'rating', 'name'];

const Home: React.FC = () => {
  const [pizzas, setPizzas] = React.useState<IPizza[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [categoryId, setCategoryId] = React.useState<number>(0);
  const [sort, setSort] = React.useState<number>(0);

  React.useEffect(() => {
    const getAllPizzas = async () => {
      setLoading(true);

      const sortName: string = sortItems[sort];
      const pizzasList: IPizza[] = [];
      let q = query(
        pizzasCollection,
        where('category', '==', categoryId),
        orderBy(sortName)
      );

      if (categoryId === 0) {
        q = query(pizzasCollection, orderBy(sortName));
      }

      const pizzaDocs = await getDocs(q);

      console.log(`CategoryID: ${categoryId} \n Sort: ${sort}`);

      pizzaDocs.docs.forEach((pizzaDoc) => {
        const pizzaData = pizzaDoc.data();
        pizzasList.push(pizzaData);
      });

      setPizzas(pizzasList);
      setLoading(false);
    };
    getAllPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sort]);

  //   React.useEffect(() => {
  //     const filteredPizzas = pizzas.filter(
  //       (pizza) => pizza.category === categoryId
  //     );
  //     console.log(categoryId, {filteredPizzas});

  //     setPizzas(filteredPizzas);
  //   }, [categoryId]);
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
        {loading
          ? [...Array<number>(8)].map(() => <Skeleton />)
          : pizzas.map((pizza: IPizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
      </div>
    </>
  );
};

export default Home;
