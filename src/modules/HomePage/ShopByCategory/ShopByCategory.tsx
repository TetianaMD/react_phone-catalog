import classNames from 'classnames';
import styles from './shopByCategory.module.scss';

export const ShopByCategory = () => {
  return (
    <section className={classNames(styles.containerShopByCategory)}>
      <div className={classNames(styles.title)}>
        {' '}
        <h1 className={classNames(styles.ShopByCategory)}>Shop by category</h1>
      </div>
      <div className={classNames(styles.category)}>
        <div className={classNames(styles.photoByCategory)}>
          <img src="./img/category/phones.png" alt="phones" />
          <h2 className={classNames(styles.categoryName)}>Mobile phones</h2>
          <p className={classNames(styles.numberOfItems)}>95 models</p>
        </div>
        <div className={classNames(styles.photoByCategory)}>
          <img src="./img/category/tablets.png" alt="" />
          <h2 className={classNames(styles.categoryName)}>Tablets</h2>
          <p className={classNames(styles.numberOfItems)}>24 models</p>
        </div>
        <div className={classNames(styles.photoByCategory)}>
          <img src="./img/category/accessories.png" alt="" />
          <h2 className={classNames(styles.categoryName)}>Accessories</h2>
          <p className={classNames(styles.numberOfItems)}>100 models</p>
        </div>
      </div>
    </section>
  );
};
