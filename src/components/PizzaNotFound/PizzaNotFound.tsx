import React from 'react';

import styles from './PizzaNotFound.module.scss';

const PizzaNotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Пицца которую вы ищите не существует
      </h1>
      <p className={styles.description}>
        Вернитесь на главную страницу и выберите пиццу. При повторных проблемах
        напишите нам в поддержку
      </p>
    </div>
  );
};

export default PizzaNotFound;
