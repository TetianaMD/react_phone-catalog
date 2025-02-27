import classNames from 'classnames';
import styles from './homePage.module.scss';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';
import { ProductsSlider } from './ProductsSlider/ProductsSlider';
import { ShopByCategory } from './ShopByCategory/ShopByCategory';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Products';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      });
  }, []);

  const newestProducts = [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 4);

  const phones = products
    .filter(product => product.category === 'phones')
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <div className={classNames(styles.containerStore)}>
      <h1 hidden>Product Catalog</h1>
      <h1 className={classNames(styles.homePage)}>
        Welcome to Nice Gadgets store!
      </h1>
      <div className={classNames(styles.homePageContainer)}>
        <PicturesSlider products={newestProducts} title="Brand new models" />
        <ShopByCategory />
        <ProductsSlider products={phones} title="Hot prices" />
      </div>
    </div>
  );
};
