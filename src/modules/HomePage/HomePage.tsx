import classNames from 'classnames';
import styles from './homePage.module.scss';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';
import { ProductsSlider } from './ProductsSlider/ProductsSlider';
import { ShopByCategory } from './ShopByCategory/ShopByCategory';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Products';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const phonesLength = products.filter(
    product => product.category === 'phones',
  ).length;

  const tabletsLength = products.filter(
    product => product.category === 'tablets',
  ).length;

  const accessoriesLength = products.filter(
    product => product.category === 'accessories',
  ).length;

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
      <div className={classNames(styles.homePageContainer)}>
        <PicturesSlider title="Welcome to Nice Gadgets store!" />
        <ProductsSlider products={newestProducts} title="Brand new models" />
        <ShopByCategory
          phonesLength={phonesLength}
          tabletsLength={tabletsLength}
          accessoriesLength={accessoriesLength}
        />
        <ProductsSlider products={phones} title="Hot prices" />
      </div>
    </div>
  );
};
