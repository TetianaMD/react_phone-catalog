import classNames from 'classnames';
import styles from './homePage.module.scss';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';
import { ProductsSlider } from './ProductsSlider/ProductsSlider';

export const HomePage = () => {
  return (
    <div className={classNames(styles.containerStore)}>
      <h1 hidden>Product Catalog</h1>
      <h1 className={classNames(styles.homePage)}>
        Welcome to Nice Gadgets store!
      </h1>
      <PicturesSlider />
      <ProductsSlider />
    </div>
  );
};
