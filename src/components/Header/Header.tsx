import { Buttons } from './Buttons/Buttons';
import { Logo } from './Logo/Logo';
import { MenuItems } from './MenuItems/MenuItems';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.containerHeader}>
      <div>
        <Logo />
      </div>

      <div className={styles.containerNav}>
        <MenuItems />

        <Buttons />
      </div>
    </header>
  );
};
