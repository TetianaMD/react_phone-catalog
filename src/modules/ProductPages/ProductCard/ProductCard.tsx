import classNames from 'classnames';
import { Product } from '../../../types/Products';
import styles from './productCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={classNames(styles.containerCard)}>
      <div key={product.id} className={classNames(styles.containerProductCard)}>
        <img
          src={product.image}
          alt={product.name}
          className={classNames(styles.productImage)}
        />
        <h2 className={classNames(styles.productName)}>{product.name}</h2>
        <div className={classNames(styles.productPrice)}>
          <p className={classNames(styles.regularPrice)}>
            ${product.fullPrice}
          </p>
          <p className={classNames(styles.discountPrice)}>${product.price}</p>
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
