import { Buttons } from './Buttons/Buttons';
import { Logo } from './Logo/Logo';
import { MenuItems } from './MenuItems/MenuItems';
import { ToggleButton } from './ToggleButton/ToggleButton';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.containerHeader}>
      <div>
        <Logo />
      </div>

      <div className={styles.containerNav}>
        <MenuItems />

        <div className={styles.containerButton}>
          <ToggleButton />
          <Buttons />
        </div>
      </div>
    </header>
  );
};
