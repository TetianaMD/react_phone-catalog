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
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    if (currentPage !== 1) {
      setSearchParams(prevParams => {
        const newParams = new URLSearchParams(prevParams);

        newParams.set('page', String(currentPage));

        return newParams;
      });
    }
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    const pageParam = Number(searchParams.get('page')) || 1;

    setCurrentPage(pageParam);
  }, [searchParams]);

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

  const itemsPerPage = Number(searchParams.get('itemsPerPage')) || 16;
  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(e.target.value);

    setSearchParams({
      sort: sortOption,
      itemsPerPage: String(newItemsPerPage),
    });
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3, 4];
    }

    if (currentPage >= totalPages - 1) {
      return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

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
                  value={itemsPerPage}
                  onChange={handleItemsPerPage}
                  className={classNames(styles.sort)}
                >
                  <option value="4" className={classNames(styles.sortBy)}>
                    4
                  </option>
                  <option value="8" className={classNames(styles.sortBy)}>
                    8
                  </option>
                  <option value="16" className={classNames(styles.sortBy)}>
                    16
                  </option>
                  <option value="all" className={classNames(styles.sortBy)}>
                    All
                  </option>
                </select>
              </div>
            </div>

            <div className={classNames(styles.containerCards)}>
              {visibleProducts.slice(0, 16).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className={classNames(styles.containerRoundButtons)}>
                <button
                  className={classNames(styles.buttonRound)}
                  onClick={handlePrevPage}
                >
                  {'<'}
                </button>
                {getPageNumbers().map(page => (
                  <button
                    key={page}
                    className={classNames(styles.buttonRound, {
                      [styles.active]: page === currentPage,
                    })}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className={classNames(styles.buttonRound)}
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  {'>'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
