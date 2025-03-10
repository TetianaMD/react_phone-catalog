import classNames from 'classnames';
import styles from './productsSlider.module.scss';
import { useState } from 'react';
import { Product } from '../../../types/Products';
import { ProductCard } from '../../ProductPages/ProductCard/ProductCard';

type ProductsSliderProps = {
  products: Product[];
  title: string;
};

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
  title,
}) => {
  const [startIndex, setStartIndex] = useState(0);

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
        <h1 className={classNames(styles.hotPrice)}>{title}</h1>
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
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
};
