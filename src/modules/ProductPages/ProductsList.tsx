import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './productsList.module.scss';
import { ProductCard } from './ProductCard/ProductCard';
import { Product } from '../../types/Products';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { pathname } = useLocation();
  const category = pathname.split('/')[1];

  useEffect(() => {
    fetch(`/api/${category}.json`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      });
  }, [category]);

  const filteredProducts = products.filter(
    product => product.category === category,
  );

  const formattedTitle =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  return (
    <div className={classNames(styles.containerPage)}>
      <div className={classNames(styles.containerTitlePage)}>
        <a href="#/">
          <img src="./logo/Home.png" alt="home" />
        </a>
        <img
          src="./logo/ArrowRight.png"
          alt="ArrowRight"
          className={classNames(styles.arrowRight)}
        />
        <h3 className={classNames(styles.page)}>{category}</h3>
      </div>

      <div className={classNames(styles.containerPage)}>
        <h1 className={classNames(styles.titlePage)}>{formattedTitle}</h1>
        <h3 className={classNames(styles.numModele)}>
          {filteredProducts.length} models
        </h3>
      </div>

      <div className={classNames(styles.containerCards)}>
        {products.slice(0, 16).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
