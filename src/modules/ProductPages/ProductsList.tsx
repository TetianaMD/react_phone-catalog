import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './productsList.module.scss';
import { ProductCard } from './ProductCard/ProductCard';
import { Product } from '../../types/Products';
import { Loader } from '../Loader/Loader';
import { useComponentLoading } from '../app/hooks';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useComponentLoading(300);
  const { pathname } = useLocation();
  const category = pathname.split('/')[1];
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOption = searchParams.get('sort') || 'Newest';

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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;

    setSearchParams({ sort: newSort });
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'Newest') {
      return b.year - a.year;
    }

    if (sortOption === 'Alphabetically') {
      return a.name.localeCompare(b.name);
    }

    if (sortOption === 'Cheapest') {
      return a.price - b.price;
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

            <div className={classNames(styles.containerButtons)}>
              <div className={classNames(styles.containerSort)}>
                <p className={classNames(styles.sortTitle)}>Sort by</p>
                <select
                  name="sortOption"
                  value={sortOption}
                  onChange={handleSortChange}
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
                  <option
                    value="Cheapest"
                    className={classNames(styles.sortBy)}
                  >
                    Cheapest
                  </option>
                </select>
              </div>

              <div className={classNames(styles.containerSort)}>
                {' '}
                <p className={classNames(styles.sortTitle)}>Items on page</p>
                <select
                  name="sortOption"
                  value={sortOption}
                  onChange={handleSortChange}
                  className={classNames(styles.sort)}
                >
                  <option value="4" className={classNames(styles.sortBy)}>
                    4
                  </option>
                  <option
                    value="Alphabetically"
                    className={classNames(styles.sortBy)}
                  >
                    8
                  </option>
                  <option
                    value="Cheapest"
                    className={classNames(styles.sortBy)}
                  >
                    16
                  </option>
                  <option
                    value="Cheapest"
                    className={classNames(styles.sortBy)}
                  >
                    All
                  </option>
                </select>
              </div>
            </div>

            <div className={classNames(styles.containerCards)}>
              {sortedProducts.slice(0, 16).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className={classNames(styles.containerRoundButtons)}>
              <button className={classNames(styles.buttonRound)}>{'<'}</button>
              <button className={classNames(styles.buttonRound)}>1</button>
              <button className={classNames(styles.buttonRound)}>2</button>
              <button className={classNames(styles.buttonRound)}>3</button>
              <button className={classNames(styles.buttonRound)}>4</button>
              <button className={classNames(styles.buttonRound)}>{'>'}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
