import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import styles from './App.module.scss';

export const App = () => {
  return (
    <div className={styles.app}>
      <h1 hidden>Product Catalog</h1>
      <Header />
      <main className={styles.contentEditable}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
