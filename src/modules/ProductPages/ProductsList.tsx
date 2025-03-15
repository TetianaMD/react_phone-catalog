import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './productsList.module.scss';
import { ProductCard } from './ProductCard/ProductCard';
import { Product } from '../../types/Products';
import { Loader } from '../Loader/Loader';
import { useComponentLoading } from '../app/hooks';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState('Newest');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useComponentLoading(300);
  const { pathname } = useLocation();
  const category = pathname.split('/')[1];

  useEffect(() => {
    setError(false);
    setIsLoading(true);

    fetch(`/api/${category}.json`)
      .then(response => {
        if (!response.ok) {
          throw Error('Failed to fetch data');
        }

        return response.json();
      })
      .then(data => {
        const updatedProducts = data.map((product: Product) => ({
          ...product,
          image:
            product.image ||
            (Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : ''),
          fullPrice:
            product.fullPrice ||
            (product.priceDiscount && product.priceDiscount > 0
              ? product.priceDiscount
              : 0),
          price:
            product.price ||
            (product.priceRegular && product.priceRegular > 0
              ? product.priceRegular
              : 0),
        }));

        setProducts(updatedProducts);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category, setIsLoading]);

  const filteredProducts = products.filter(
    product => product.category === category,
  );

  const formattedTitle =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'Newest') {
      return b.year - a.year;
    }

    if (sortOption === 'Alphabetically') {
      return a.name.localeCompare(b.name);
    }

    if (sortOption === 'Cheapest') {
      return a.fullPrice - a.price - (b.fullPrice - b.price);
    }

    return 0;
  });

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

        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className={classNames(styles.errorContainer)}>
            <p>Something went wrong</p>
            <button onClick={() => window.location.reload()}>Reload</button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p>There are no {category} yet. </p>
        ) : (
          <>
            <h3 className={classNames(styles.numModele)}>
              {filteredProducts.length} models
            </h3>

            <div className={classNames(styles.containerPage)}>
              <p className={classNames(styles.sortTitle)}>Sort by</p>
              <select
                name="sortOption"
                onChange={e => setSortOption(e.target.value)}
                className={classNames(styles.sort)}
              >
                <option value="Newest" className={classNames(styles.sortBy)}>
                  Newest
                </option>
                <option
                  value="Alphabetically"
                  className={classNames(styles.sortBy)}
                >
                  Alphabetically
                </option>
                <option value="Cheapest" className={classNames(styles.sortBy)}>
                  Cheapest
                </option>
              </select>
            </div>

            <div className={classNames(styles.containerCards)}>
              {sortedProducts.slice(0, 16).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
