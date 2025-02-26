import classNames from 'classnames';
import styles from './homePage.module.scss';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';
import { ProductsSlider } from './ProductsSlider/ProductsSlider';
import { ShopByCategory } from './ShopByCategory/ShopByCategory';

export const HomePage = () => {
  return (
    <div className={classNames(styles.containerStore)}>
      <h1 hidden>Product Catalog</h1>
      <h1 className={classNames(styles.homePage)}>
        Welcome to Nice Gadgets store!
      </h1>
      <div className={classNames(styles.homePageContainer)}>
        <PicturesSlider />
        <ShopByCategory />
        <ProductsSlider />
      </div>
    </div>
  );
};
