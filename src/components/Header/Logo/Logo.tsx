import styles from './logo.module.scss';

export const Logo = () => {
  return (
    <div className={styles.containerMenu}>
      <img src="./logo/Logo.png" alt="Logo" className="styles.menu" />
    </div>
  );
};
