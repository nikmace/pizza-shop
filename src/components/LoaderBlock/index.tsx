import React from 'react';

import styles from './LoaderBlock.module.scss';
import pizzaLogo from '../../assets/img/pizza-logo.svg';

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <img className={styles.loader} src={pizzaLogo} alt="Pizza Logo" />
    </div>
  );
};

export default Loader;
