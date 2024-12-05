import styles from './buttons.module.scss';

export const Buttons = () => {
  return (
    <header className={styles.containerButtons}>
      <div className={styles.containerBasket}>
        <img
          src="./logo/favorite.png"
          alt="Logo"
          className={styles.buttonFavorite}
        />
      </div>
      <div className={styles.containerFavorite}>
        <img
          src="./logo/basket.png"
          alt="Logo"
          className={styles.buttonBasket}
        />
      </div>
    </header>
  );
};
