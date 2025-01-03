import { Logo } from '../Header/Logo/Logo';
import { Button } from './Button/Button';
import styles from './footer.module.scss';
import { MenuFooter } from './MenuFooter/MenuFooter';

export const Footer = () => {
  return (
    <footer className={styles.containerFooter}>
      <div>
        <Logo />
      </div>

      <div>
        <MenuFooter />
      </div>

      <div>
        <Button />
      </div>
    </footer>
  );
};
