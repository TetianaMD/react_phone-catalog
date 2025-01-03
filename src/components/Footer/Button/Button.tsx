import styles from './button.module.scss';

export const Button = () => {
  return (
    <div className={styles.containetTop}>
      <h1 className={styles.backToTop}>Back to top</h1>
      <button className={styles.sliderButton}>↑</button>
    </div>
  );
};
