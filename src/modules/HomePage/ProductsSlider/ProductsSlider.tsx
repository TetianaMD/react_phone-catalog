import classNames from 'classnames';
import styles from './productsSlider.module.scss';
import { useEffect, useState } from 'react';
// import { Product } from '../../../types/Products';
import { Phones } from '../../../types/Phones';

export const ProductsSlider = () => {
  const [products, setProducts] = useState<Phones[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetch('/api/phones.json')
      .then(response => {
        if (!response) {
          throw new Error();
        }

        return response.json();
      })
      .then(data => setProducts(data));
  }, []);

  const handleNext = () => {
    if (startIndex + 4 < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className={classNames(styles.containerProductsSlider)}>
      <div className={classNames(styles.hotPriceContainer)}>
        <h1 className={classNames(styles.hotPrice)}>Hot prices</h1>
        <div className={classNames(styles.buttonContainer)}>
          <button
            onClick={handlePrev}
            className={classNames(styles.buttonRound)}
            disabled={startIndex === 0}
          >
            <span className={classNames(styles.arrowLeft)}></span>
          </button>
          <button
            onClick={handleNext}
            className={classNames(styles.buttonRound)}
            disabled={startIndex + 4 >= products.length}
          >
            <span className={classNames(styles.arrowRight)}></span>
          </button>
        </div>{' '}
      </div>
      <div className={classNames(styles.productFlex)}>
        {products.slice(startIndex, startIndex + 4).map(product => {
          return (
            <div
              key={product.id}
              className={classNames(styles.containerProductCard)}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className={classNames(styles.productImage)}
              />
              <h2 className={classNames(styles.productName)}>{product.name}</h2>
              <div>
                <p className={classNames(styles.productPrice)}>
                  ${product.priceRegular}
                </p>
                <p className={classNames(styles.productPrice)}>
                  ${product.priceDiscount}
                </p>
              </div>
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
