import styles from './button.module.scss';

export const Button = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.containetTop}>
      <h1 className={styles.backToTop}>Back to top</h1>
      <button onClick={scrollToTop} className={styles.sliderButton}>
        ↑
      </button>
    </div>
  );
};
