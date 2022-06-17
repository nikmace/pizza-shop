import React from 'react';
import { useDispatch } from 'react-redux';

import { changeCategory } from '../redux/filter/slice';

type CategoryProps = {
  categoryId: number;
};

const categories = [
  { category: 'Все', id: 'cat0' },
  { category: 'Мясные', id: 'cat1' },
  { category: 'Вегетарианская', id: 'cat2' },
  { category: 'Гриль', id: 'cat3' },
  { category: 'Острые', id: 'cat4' },
  { category: 'Закрытые', id: 'cat5' },
];

const Categories: React.FC<CategoryProps> = React.memo(({ categoryId }) => {
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map(({ category, id }, idx) => (
          <li
            onClick={() => dispatch(changeCategory(idx))}
            className={categoryId === idx ? 'active' : ''}
            key={id}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
