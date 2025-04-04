import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../../types/Product';
import classNames from 'classnames';
import styles from './productDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/products.json`)
      .then(response => {
        if (!response.ok) {
          throw Error();
        }

        return response.json();
      })
      .then((data: Product[]) => {
        const foundProduct = data.find(p => p.itemId === productId);

        if (!foundProduct) {
          setError('Product was not found');
        } else {
          setProduct(foundProduct);
        }
      })
      .catch(() => setError('Failed to load product details'));
  }, [productId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={classNames(styles.containerDetails)}>
      <h1 className={classNames(styles.nameOfProduct)}>{product?.name}</h1>
      <img src={product?.image} alt={product?.name} />
    </section>
  );
};
