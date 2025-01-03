import styles from './buttons.module.scss';

export const Buttons = () => {
  return (
    <div className={styles.containerButtons}>
      <a href="#/favourites" className={styles.navigationLink}>
        <div className={styles.iconContainer}>
          <img src="./logo/favorite.png" alt="" />
        </div>
      </a>

      <a href="#/cart" className={styles.navigationLink}>
        <div className={styles.iconContainer}>
          <img src="./logo/basket.png" alt="" />
        </div>
      </a>
    </div>
  );
};
