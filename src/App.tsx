import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import styles from './App.module.scss';
import { useComponentLoading } from './modules/app/hooks';
import { Loader } from './modules/Loader/Loader';

export const App = () => {
  const [isLoading] = useComponentLoading(300);

  if (isLoading) {
    return <Loader />;
  }

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
