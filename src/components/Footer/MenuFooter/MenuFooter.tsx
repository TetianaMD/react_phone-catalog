import { NavLink } from 'react-router-dom';
import styles from './menuFooter.module.scss';

export const MenuFooter = () => {
  return (
    <nav className={styles.containerNavLink}>
      <NavLink className={styles.footerNavLink} to="/github">
        GITHUB
      </NavLink>
      <NavLink className={styles.footerNavLink} to="/contacts">
        CONTACTS
      </NavLink>
      <NavLink className={styles.footerNavLink} to="/rights">
        RIGHTS
      </NavLink>
    </nav>
  );
};
