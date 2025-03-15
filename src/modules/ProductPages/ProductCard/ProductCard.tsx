import classNames from 'classnames';
import { Product } from '../../../types/Products';
import styles from './productCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const imageUrl =
    product.image ||
    (Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : '');

  const priceDiscount =
    product.fullPrice ||
    (product.priceDiscount && product.priceDiscount > 0
      ? product.priceDiscount
      : 0);

  const priceFull =
    product.price ||
    (product.priceRegular && product.priceRegular > 0
      ? product.priceRegular
      : 0);

  return (
    <div className={classNames(styles.containerCard)}>
      <div key={product.id} className={classNames(styles.containerProductCard)}>
        {imageUrl ? (
          <img
            src={product.image}
            alt={product.name}
            className={classNames(styles.productImage)}
          />
        ) : (
          <div className={classNames(styles.placeholder)}>No Image</div>
        )}
        <h2 className={classNames(styles.productName)}>{product.name}</h2>
        <div className={classNames(styles.productPrice)}>
          {priceFull ? (
            <p className={classNames(styles.regularPrice)}>
              ${product.fullPrice}
            </p>
          ) : (
            <p>No price</p>
          )}
          {priceDiscount ? (
            <p className={classNames(styles.discountPrice)}>${product.price}</p>
          ) : (
            <p>No price</p>
          )}
        </div>
        <div className={classNames(styles.productContainer)}>
          <div className={classNames(styles.productInfo)}>
            <p className={classNames(styles.productDescription)}>Screen:</p>
            <p> {product.screen}</p>
          </div>
          <div className={classNames(styles.productInfo)}>
            <p className={classNames(styles.productDescription)}>Capacity:</p>
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
    </div>
  );
};
