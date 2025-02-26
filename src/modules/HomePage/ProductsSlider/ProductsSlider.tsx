import classNames from 'classnames';
import styles from './productsSlider.module.scss';
import { useEffect, useState } from 'react';
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
      .then(data => {
        const sortedProducts = data.sort(
          (a: Phones, b: Phones) =>
            Math.abs(b.priceRegular - b.priceDiscount) -
            Math.abs(a.priceRegular - a.priceDiscount),
        );

        setProducts(sortedProducts);
      });
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
    <section className={classNames(styles.containerProductsSlider)}>
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
              <div className={classNames(styles.productPrice)}>
                <p className={classNames(styles.regularPrice)}>
                  ${product.priceRegular}
                </p>
                <p className={classNames(styles.discountPrice)}>
                  ${product.priceDiscount}
                </p>
              </div>
              <div className={classNames(styles.productContainer)}>
                <div className={classNames(styles.productInfo)}>
                  <p className={classNames(styles.productDescription)}>
                    Screen:
                  </p>
                  <p> {product.screen}</p>
                </div>
                <div className={classNames(styles.productInfo)}>
                  <p className={classNames(styles.productDescription)}>
                    Capacity:
                  </p>
                  <p> {product.capacity}</p>
                </div>
                <div className={classNames(styles.productInfo)}>
                  <p className={classNames(styles.productDescription)}>RAM:</p>
                  <p>{product.ram}</p>
                </div>
              </div>

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
    </section>
  );
};
