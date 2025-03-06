import classNames from 'classnames';
import styles from './shopByCategory.module.scss';
import { NavLink } from 'react-router-dom';

export const ShopByCategory = () => {
  return (
    <section className={classNames(styles.containerShopByCategory)}>
      <div className={classNames(styles.title)}>
        {' '}
        <h1 className={classNames(styles.ShopByCategory)}>Shop by category</h1>
      </div>
      <nav className={classNames(styles.category)}>
        <NavLink className={classNames(styles.photoByCategory)} to="/phones">
          <img src="./img/category/phones.png" alt="phones" />
          <h2 className={classNames(styles.categoryName)}>Mobile phones</h2>
          <p className={classNames(styles.numberOfItems)}>95 models</p>
        </NavLink>
        <NavLink className={classNames(styles.photoByCategory)} to="/tablets">
          <img src="./img/category/tablets.png" alt="" />
          <h2 className={classNames(styles.categoryName)}>Tablets</h2>
          <p className={classNames(styles.numberOfItems)}>24 models</p>
        </NavLink>
        <NavLink
          className={classNames(styles.photoByCategory)}
          to="/accessories"
        >
          <img src="./img/category/accessories.png" alt="" />
          <h2 className={classNames(styles.categoryName)}>Accessories</h2>
          <p className={classNames(styles.numberOfItems)}>100 models</p>
        </NavLink>
      </nav>
    </section>
  );
};
