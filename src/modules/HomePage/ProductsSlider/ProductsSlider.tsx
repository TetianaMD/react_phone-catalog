import classNames from 'classnames';
import styles from './productsSlider.module.scss';
import { useEffect, useState } from 'react';
import { Product } from '../../../types/Products';

export const ProductsSlider = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => {
        if (!response) {
          throw new Error();
        }

        return response.json();
      })
      .then(data => setProducts(data));
  }, []);

  return (
    <div className={classNames(styles.containerProductsSlider)}>
      <h1 className={classNames(styles.hotPrice)}>Hot prices</h1>
      <div className={classNames(styles.productFlex)}>
        {products.map(product => {
          return (
            <div
              key={product.id}
              className={classNames(styles.containerProductCard)}
            >
              <img
                src={product.image}
                alt={product.name}
                className={classNames(styles.productImage)}
              />
              <h2 className={classNames(styles.productName)}>{product.name}</h2>
              <p className={classNames(styles.productPrice)}>
                ${product.price}
              </p>
              <p className={classNames(styles.productScreen)}>
                Screen: {product.screen}
              </p>
              <p className={classNames(styles.productCapacity)}>
                Capacity: {product.capacity}
              </p>
              <p className={classNames(styles.productRam)}>
                RAM: {product.ram}
              </p>

              <div className={classNames(styles.containerButton)}>
                <button className={classNames(styles.productButton)}>
                  Add to cart
                </button>
                <button className={classNames(styles.buttonFavourites)}>
                  <a
                    href="/#favourites"
                    className={classNames(styles.productFavourites)}
                  >
                    <img src="./logo/favorite.png" alt="" />
                  </a>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
