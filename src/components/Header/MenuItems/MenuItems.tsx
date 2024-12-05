import { NavLink } from 'react-router-dom';
import styles from './menuItems.module.scss';
import classNames from 'classnames';

export const MenuItems = () => {
  return (
    <header className={classNames(styles.containerMenu)}>
      <nav className={classNames(styles.nav)}>
        <NavLink
          className={({ isActive }) =>
            classNames(styles.navLink, { [styles.isActive]: isActive })
          }
          to="/"
        >
          HOME
        </NavLink>
        <NavLink className={classNames(styles.navLink)} to="/phones">
          PHONES
        </NavLink>
        <NavLink className={classNames(styles.navLink)} to="/tablets">
          TABLETS
        </NavLink>
        <NavLink
          className={classNames(styles.navLink)}
          data-qa="hover"
          to="/accessories"
        >
          ACCESSORIES
        </NavLink>
      </nav>
    </header>
  );
};
