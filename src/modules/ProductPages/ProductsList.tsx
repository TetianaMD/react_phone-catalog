import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './productsList.module.scss';
import { ProductCard } from './ProductCard/ProductCard';

export const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/${category}.json`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      });
  }, [category]);

  return (
    <div>
      <div className={classNames(styles.containerTitlePage)}>
        <a href="#/">
          <img src="./logo/Home.png" alt="home" />
        </a>
        <img
          src="./logo/ArrowRight.png"
          alt="ArrowRight"
          className={classNames(styles.arrowRight)}
        />
        <h3 className={classNames(styles.page)}>Phones</h3>
      </div>

      <div className={classNames(styles.containerPage)}>
        <h1 className={classNames(styles.titlePage)}>Mobile phones</h1>
        <h3 className={classNames(styles.numModele)}>95 models</h3>
      </div>

      <div>
        {products.map(product => (
          <ProductCard key={product} product={product} />
        ))}
      </div>
    </div>
  );
};
